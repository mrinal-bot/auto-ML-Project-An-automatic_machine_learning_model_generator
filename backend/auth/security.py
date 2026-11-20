import os
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
import bcrypt
import jwt

# Secure secret key with fallback for development
SECRET_KEY = os.getenv(
    "MLFORGE_JWT_SECRET",
    "mlforge_ai_super_secure_secret_key_2026_agentic_automl_kernel_production_grade_token_secret"
)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24
REMEMBER_ME_EXPIRE_DAYS = 7

def hash_password(password: str) -> str:
    """Hash password using bcrypt."""
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against bcrypt hash."""
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8")
        )
    except Exception:
        return False

def create_access_token(data: Dict[str, Any], remember_me: bool = False) -> str:
    """Generate a signed JWT access token."""
    to_encode = data.copy()
    if remember_me:
        expire = datetime.now(timezone.utc) + timedelta(days=REMEMBER_ME_EXPIRE_DAYS)
    else:
        expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Decode and validate a JWT access token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except (jwt.PyJWTError, Exception):
        return None

def generate_reset_token() -> str:
    """Generate a cryptographically secure random reset token."""
    return secrets.token_urlsafe(32)

