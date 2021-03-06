from ..daos.account_dao import AccountDao
from ..models.user_model import UserModel
from ..models.employer_model import EmployerModel
from ..constants.account_constants import NO_USER_FOUND_WITH_EMAIL_ACCOUNT_ERROR_MESSAGE


class AccountModel():
    """Model to handle account logic"""

    def __init__(self, dao=None):
        self.dao = dao or AccountDao()

    def sign_up_user(self, user: UserModel):
        """Sign up a new user"""
        try:
            user.load_hashed_password_data()
            if self.dao.save_new_user(user):
                return self.dao.get_user_info_from_email_and_password(
                    user.email_address, user.hashed_password_data.get_hashed_password()
                )
            return False
        except Exception as error:
            raise Exception(error)

    def sign_up_employer(self, employer: EmployerModel):
        """Sign up a new employer"""
        try:
            employer.load_hashed_password_data()
            if self.dao.save_new_user(employer):
                user_info = self.dao.get_user_info_from_email_and_password(
                    employer.email_address, employer.hashed_password_data.get_hashed_password()
                )
            if self.dao.save_new_employer(user_info["user_id"], employer):
                return user_info
            return False
        except Exception as error:
            raise Exception(error)

    def login_user(self, user: UserModel):
        """Login a returning user"""
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
