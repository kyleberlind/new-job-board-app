import unittest
from api.models.user_model import UserModel
from unittest.mock import MagicMock
from api.constants.account_constants import\
    EMAIL_LENGTH_VALIDATION_ERROR_MESSAGE, PASSWORD_LENGTH_VALIDATION_ERROR_MESSAGE


TEST_EMAIL = "test@test.com"
TEST_PASSWORD = "testpassword"
TEST_USER_TYPE = 1
TEST_USER_INFO = {
    "email_address": TEST_EMAIL,
    "password": TEST_PASSWORD,
    "user_type": TEST_USER_TYPE
}


class UserModelTest(unittest.TestCase):
    """Tests for the user model"""
    _user_model: UserModel(
        **TEST_USER_INFO
    )

if __name__ == '__main__':
    unittest.main()
