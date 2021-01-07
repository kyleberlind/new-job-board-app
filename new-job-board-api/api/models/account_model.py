from ..daos.account_dao import AccountDao
from ..models.user_model import UserModel
from ..constants.account_constants import NO_USER_FOUND_WITH_EMAIL_ACCOUNT_ERROR_MESSAGE


class AccountModel():
    """
    Model to handle account logic
    """

    def __init__(self):
        self.dao = AccountDao()

    def sign_up_user(self, user: UserModel):
        """
        Sign up a new user
        """
        try:
            user.load_hashed_password_data()
            if self.dao.save_new_user(user):
                return self.dao.get_user_info_from_email_and_password(
                    user.email_address, user.hashed_password_data.get_hashed_password()
                )
            return False
        except Exception as error:
            raise Exception(error)

    def login_user(self, user: UserModel):
        """
        Login a returning user
        """
        try:
            salt = str.encode(
                self.dao.get_salt_from_email_address(user.email_address))
            if not salt:
                raise Exception(NO_USER_FOUND_WITH_EMAIL_ACCOUNT_ERROR_MESSAGE)
            user.load_hashed_password_data(salt=salt)
            return self.dao.get_user_info_from_email_and_password(
                user.email_address, user.hashed_password_data.get_hashed_password()
            )
        except Exception as error:
            raise Exception(error)
