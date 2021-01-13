import unittest
from unittest.mock import MagicMock, PropertyMock
from api.daos.account_dao import AccountDao


TEST_EMAIL = "test@test.com"
TEST_PASSWORD = "password"
TEST_USER_TYPE = 1
TEST_SALT = "salt"

TEST_ACCOUNT_INFO = {"user_id": 1, "user_type": 1}


class AccountDaoTest(unittest.TestCase):
    """Tests for the user model"""

    def setUp(self):
        """sets up the test"""

        self._mock_db = MagicMock()
        self._user = MagicMock()
        self._account_dao = AccountDao(self._mock_db)

    def test_save_new_user(self):
        """Tests that save_new_user functions correctly"""
        actual = self._account_dao.save_new_user(self._user)
        self.assertTrue(actual)

    def test_get_user_info_from_email_and_password_success(self):
        """Tests that get_user_info_from_email_and_password functions correctly"""
        self._mock_db.connect.return_value.cursor.return_value.fetchone.return_value = TEST_ACCOUNT_INFO
        actual = self._account_dao.get_user_info_from_email_and_password(TEST_EMAIL, TEST_PASSWORD)
        result = TEST_ACCOUNT_INFO
        self.assertEqual(actual, result)
    
    def test_get_user_info_from_email_and_password_incorrect_email_or_password(self):
        """
        Tests that get_user_info_from_email_and_password
        functions correct when email or password is wrong
        """
        self._mock_db.connect.return_value.cursor.return_value.fetchone.return_value = None
        with self.assertRaises(Exception): 
            self._account_dao.get_user_info_from_email_and_password(TEST_EMAIL, TEST_PASSWORD)

    def test_get_salt_from_email_address(self):
        """Tests that get_salt_from_email_address functions correctly"""

        self._mock_db.connect.return_value.cursor.return_value.fetchone.return_value = {"salt": TEST_SALT}
        actual = self._account_dao.get_salt_from_email_address(TEST_EMAIL)
        result = TEST_SALT
        self.assertEqual(actual, result)

    
    def test_get_salt_from_email_address_no_email_found(self):
        """
        Tests that get_salt_from_email_address functions correctly
        when no account for email is found
        """
        self._mock_db.connect.return_value.cursor.return_value.fetchone.return_value = None
        with self.assertRaises(Exception): 
            self._account_dao.get_salt_from_email_address(TEST_EMAIL)

if __name__ == '__main__':
    unittest.main()
