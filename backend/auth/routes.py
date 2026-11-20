from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from .database import get_db
from .schemas import (
    UserRegister,
    UserLogin,
    UserResponse,
    AuthResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    MessageResponse
)
from .service import (
    register_user,
    authenticate_user,
    get_user_by_id,
    create_password_reset_token,
    reset_password
)
from .security import create_access_token, decode_access_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

COOKIE_NAME = "mlforge_access_token"

def get_current_user_from_token(
    request: Request,
    db: Session = Depends(get_db)
) -> UserResponse:
    """Dependency to retrieve the authenticated user from HTTP-only cookie or Bearer header."""
    token = request.cookies.get(COOKIE_NAME)
    
    # Optional fallback to Authorization header if cookie not sent
    if not token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. No session token found."
        )

    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid token. Please sign in again."
        )

    user_id = payload.get("sub")
    user = get_user_by_id(db, int(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User associated with this session no longer exists."
        )

    return user

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(
    user_in: UserRegister,
    response: Response,
    db: Session = Depends(get_db)
):
    """Register a new user, issue secure HTTP-only cookie, and return user profile."""
    user = register_user(db, user_in)
    
    # Automatically issue session token upon successful registration
    token = create_access_token(data={"sub": str(user.id), "email": user.email})
    max_age = 24 * 3600  # 24 hours

    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        max_age=max_age,
        expires=max_age,
        samesite="lax",
        secure=False  # Localhost dev mode
    )

    return AuthResponse(
        status="success",
        message="Account created successfully. Welcome to MLForge AI!",
        user=UserResponse.model_validate(user),
        access_token=token
    )

@router.post("/login", response_model=AuthResponse)
def login(
    user_in: UserLogin,
    response: Response,
    db: Session = Depends(get_db)
):
    """Verify credentials, issue HTTP-only cookie, and return user profile."""
    user = authenticate_user(db, user_in.email, user_in.password)
    
    token = create_access_token(
        data={"sub": str(user.id), "email": user.email},
        remember_me=user_in.remember_me or False
    )

    # 7 days if remember_me else 24 hours
    max_age = (7 * 24 * 3600) if user_in.remember_me else (24 * 3600)

    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        max_age=max_age,
        expires=max_age,
        samesite="lax",
        secure=False  # Localhost dev mode
    )

    return AuthResponse(
        status="success",
        message="Authentication successful.",
        user=UserResponse.model_validate(user),
        access_token=token
    )

@router.post("/logout", response_model=MessageResponse)
def logout(response: Response):
    """Clear the HTTP-only session cookie."""
    response.delete_cookie(
        key=COOKIE_NAME,
        httponly=True,
        samesite="lax"
    )
    return MessageResponse(
        status="success",
        message="Logged out successfully."
    )

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    current_user: UserResponse = Depends(get_current_user_from_token)
):
    """Retrieve profile of the currently authenticated user."""
    return current_user

@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(
    request_in: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    """Initiate password recovery."""
    token = create_password_reset_token(db, request_in.email)
    
    # For local testing and development transparency, return the reset_token
    # In strict production without mail server, this enables smooth end-to-end testing
    return MessageResponse(
        status="success",
        message="If an account with that email exists, password reset instructions have been generated.",
        reset_token=token
    )

@router.post("/reset-password", response_model=MessageResponse)
def perform_reset_password(
    request_in: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    """Reset password using a valid reset token."""
    reset_password(db, request_in.token, request_in.new_password)
    return MessageResponse(
        status="success",
        message="Password has been successfully updated. You may now sign in with your new password."
    )

