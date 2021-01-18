import MySQLdb
from ..models.user_model import UserModel
from ..api_secrets.aws_credentials import AWS_PASSWORD, AWS_USER_NAME, AWS_HOSTNAME
from ..constants.account_constants import\
    INCORRECT_EMAIL_OR_PASSWORD_ERROR_MESSAGE,\
    NO_USER_FOUND_WITH_EMAIL_ACCOUNT_ERROR_MESSAGE,\
    NO_EMPLOYER_FOUND_ASSOCIATED_WITH_USER_ERROR_MESSAGE


class AccountDao():
    """Data Access object for account information"""

    def __init__(self, db=None):
        self.db = db or MySQLdb
        self.user_connection = self.db.connect(
            host=AWS_HOSTNAME,
            user=AWS_USER_NAME,
            password=AWS_PASSWORD,
            db="user"
        )

    def save_new_user(self, user: UserModel):
        """Enters a new user into the database and returns True if successful"""
        try:
            cursor = self.user_connection.cursor()
            cursor.execute(
                "INSERT INTO user.tbl_user (email_address, user_type, password, salt)\
                 VALUES (%s, %s, %s, %s)",
                (
                    user.email_address,
                    user.user_type,
                    user.hashed_password_data.get_hashed_password(),
                    user.hashed_password_data.get_salt()
                )
            )
            cursor.close()
            self.user_connection.commit()

            return True

        except Exception as error:
            raise Exception(error)

    def save_new_employer(self, user_id: int, employer: UserModel):
        """Enters a new employer into the database and returns their True"""
        try:
            cursor = self.user_connection.cursor()
            cursor.execute(
                "INSERT INTO user.tbl_employer (user_id, employer_name, employer_size)\
                 VALUES (%s, %s, %s)",
                (
                    user_id,
                    employer.employer_name,
                    employer.employer_size
                )
            )
            cursor.close()
            self.user_connection.commit()

            return True

        except Exception as error:
            raise Exception(error)

    def get_user_info_from_email_and_password(self, email: str, password: str):
        """Gets the User ID for the given email and password combo if a user exists."""
        try:
            cursor = self.user_connection.cursor(self.db.cursors.DictCursor)
            cursor.execute(
                """
                    SELECT id AS user_id,
                           user_type AS user_type
                      FROM user.tbl_user
                     WHERE email_address = %s
                       AND password = %s
                """,
                [
                    email,
                    password
                ]
            )
            results = cursor.fetchone()
            if results:
                user_information = results
                cursor.close()
            else:
                cursor.close()
                raise Exception(INCORRECT_EMAIL_OR_PASSWORD_ERROR_MESSAGE)
            return user_information

        except Exception as error:
            raise Exception(error)

    def get_salt_from_email_address(self, email_address: str):
        """Gets the salt associated with the email address"""
        try:
            cursor = self.user_connection.cursor(self.db.cursors.DictCursor)
            cursor.execute(
                """
                    SELECT salt
                      FROM user.tbl_user
                     WHERE email_address = %s
                """,
                [email_address]
            )
            results = cursor.fetchone()
            if results:
                salt = results["salt"]
                cursor.close()
            else:
                cursor.close()
                raise Exception(NO_USER_FOUND_WITH_EMAIL_ACCOUNT_ERROR_MESSAGE)
            return salt
        except Exception as error:
            raise Exception(error)

    def load_employer_info(self, user_id):
        """Gets the employer info from the user ID"""
        try:
            cursor = self.user_connection.cursor(self.db.cursors.DictCursor)
            cursor.execute(
                """
                    SELECT employer_id,
                           employer_name,
                           employer_size,
                           sign_up_date
                    FROM   user.tbl_employer
                    WHERE  user_id = %s
                """,
                [user_id]
            )
            result = cursor.fetchone()
            if result:
                cursor.close()
                return result
            else:
                cursor.close()
                raise Exception(
                    NO_EMPLOYER_FOUND_ASSOCIATED_WITH_USER_ERROR_MESSAGE)
        except Exception as error:
            raise Exception(str(error))
