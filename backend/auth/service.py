from datetime import datetime, timedelta, timezone
from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from .models import User
from .schemas import UserRegister
from .security import hash_password, verify_password, generate_reset_token

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Retrieve user by normalized email address."""
    return db.query(User).filter(User.email == email.lower().strip()).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Retrieve user by primary key ID."""
    return db.query(User).filter(User.id == user_id).first()

def register_user(db: Session, user_in: UserRegister) -> User:
    """Register a new user after verifying email uniqueness."""
    normalized_email = user_in.email.lower().strip()
    existing_user = get_user_by_email(db, normalized_email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please sign in or use another email."
        )

    hashed = hash_password(user_in.password)
    db_user = User(
        name=user_in.name.strip(),
        email=normalized_email,
        hashed_password=hashed
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str) -> User:
    """Verify credentials and return user object or raise 401."""
    normalized_email = email.lower().strip()
    user = get_user_by_email(db, normalized_email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Please verify your credentials."
        )

    if not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Please verify your credentials."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account has been deactivated. Please contact support."
        )

    return user

def create_password_reset_token(db: Session, email: str) -> Optional[str]:
    """Generate and store a 1-hour password reset token if user exists."""
    user = get_user_by_email(db, email)
    if not user:
        return None

    token = generate_reset_token()
    user.reset_token = token
    user.reset_token_expires = datetime.now(timezone.utc) + timedelta(hours=1)
    db.commit()
    return token

def reset_password(db: Session, token: str, new_password: str) -> User:
    """Validate reset token and update user password."""
    now = datetime.now(timezone.utc)
    user = db.query(User).filter(
        User.reset_token == token
    ).first()

    if not user or not user.reset_token_expires:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The password reset link is invalid or has expired."
        )

    # Check if expired (make timezone-aware comparison)
    expires = user.reset_token_expires
    if expires.tzinfo is None:
        expires = expires.replace(tzinfo=timezone.utc)

    if expires < now:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The password reset link has expired. Please request a new one."
        )

    user.hashed_password = hash_password(new_password)
    user.reset_token = None
    user.reset_token_expires = None
    db.commit()
    db.refresh(user)
    return user

