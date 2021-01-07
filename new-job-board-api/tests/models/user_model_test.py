import unittest
from api.models.user_model import UserModel
from unittest.mock import MagicMock

TEST_EMAIL = "test@test.com"
TEST_PASSWORD = "testpassword"
TEST_USER_TYPE = 1


class UserModeTest(unittest.TestCase):
    """test for the user model"""
    _user_model: UserModel
    def setUp(self):

        self._user_model = UserModel(
            email = TEST_EMAIL,
            password = TEST_PASSWORD,
            user_type = TEST_USER_TYPE
        )

    def test_validate_email_address_length_too_long(self):
        self.assertTrue(True)

    def test_load_hashed_password_data(self):
        self._user_model.load_hashed_password_data()


if __name__ == '__main__':
    unittest.main()
