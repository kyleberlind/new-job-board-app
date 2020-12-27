from .hash_engine import HashEngine

class HashedPasswordData():
    """Hashed password data object for keeping the hashed password and the salt"""
    def __init__(self, plain_text_password, salt=None):
        self._hash_engine = HashEngine()
        self._salt = salt or self._hash_engine.generate_salt()
        self._hashed_password = self._hash_engine.generate_hashed_password(
            plain_text_password.encode('utf-8'), self._salt)

    def get_salt(self) -> str:
        """Gets the Hashed Passwords Salt"""
        return self._salt

    def get_hashed_password(self) -> str:
        """Gets the Hashed Password"""
        return self._hashed_password
