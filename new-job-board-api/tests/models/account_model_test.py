import unittest
from api.models.account_model import AccountModel
from unittest.mock import MagicMock

TEST_ACCOUNT_INFO = {"user_id": 1, "user_type": 1}
TEST_SALT = "salt"


class AccountModelTest(unittest.TestCase):
    """Test for account model"""

    def setUp(self):
        """sets up the test"""
        self._mock_dao = MagicMock()
        self._mock_user = MagicMock()
        self._account = AccountModel(
            self._mock_dao
        )

    def test_sign_up_user_success(self):
        """Test sign_up_user functions correctly"""
        self._mock_dao.save_new_user = MagicMock(return_value=True)
        self._mock_dao.get_user_info_from_email_and_password = MagicMock(
            return_value=TEST_ACCOUNT_INFO
        )
        actual = self._account.sign_up_user(self._mock_user)
        expected = TEST_ACCOUNT_INFO
        self.assertEqual(actual, expected)

    def test_sign_up_user_failure(self):
        """Test sign_up_user functions when creating new user fails"""
        self._mock_dao.save_new_user = MagicMock(return_value=False)
        actual = self._account.sign_up_user(self._mock_user)
        self.assertFalse(actual)

    def test_login_user(self):
        """Test login_user functions correctly"""
        self._mock_dao.get_salt_from_email_address = MagicMock(
            return_value=TEST_SALT)
        self._mock_dao.get_user_info_from_email_and_password = MagicMock(
            return_value=TEST_ACCOUNT_INFO
        )
        self._mock_user.hashed_password_data = MagicMock(
            return_value="hashed_password")
        actual = self._account.login_user(self._mock_user)
        expected = TEST_ACCOUNT_INFO
        self.assertEqual(actual, expected)

    def test_login_user_no_user_found(self):
        """Test login_user functions throws an exception when user not found"""
        self._mock_dao.get_salt_from_email_address = MagicMock(return_value="")
        with self.assertRaises(Exception):
            self._account.login_user(self._mock_user)

if __name__ == '__main__':
    unittest.main()
