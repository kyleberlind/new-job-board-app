"""12/04/2020"""
from flask_bcrypt import bcrypt


def generate_hashed_password(password: str, salt: str) -> str:
    """Generates a hashed password from a plain text password and a salt"""
    return bcrypt.hashpw(password, salt)


def generate_salt() -> str:
    """Generates a salt"""
    return bcrypt.gensalt()
