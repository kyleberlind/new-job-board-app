from flask_bcrypt import bcrypt


class HashEngine():
    '''hashslinging slasher'''

    def generate_hashed_password(self, password: str, salt: str) -> str:
        """Generates a hashed password from a plain text password and a salt"""
        return bcrypt.hashpw(password, salt)

    def generate_salt(self) -> str:
        """Generates a salt"""
        return bcrypt.gensalt()
