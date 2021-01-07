import MySQLdb
from ..models.user_model import UserModel
from ..api_secrets.aws_credentials import AWS_PASSWORD, AWS_USER_NAME, AWS_HOSTNAME


class AccountDao():
    """Data Access object for account information"""

    def __init__(self, db=None):
        self.db = db or MySQLdb.connect(
            host=AWS_HOSTNAME,
            user=AWS_USER_NAME,
            password=AWS_PASSWORD,
            db="user"
        )

    def save_new_user(self, user: UserModel):
        """Enters a new user into the database and returns their user ID if successful"""
        try:
            cursor = self.db.cursor()
            cursor.execute(
                "INSERT INTO user.tbl_user (email_address, user_type, password, salt) VALUES (%s, %s, %s, %s)",
                (
                    user.email_address,
                    user.user_type,
                    user.hashed_password_data.get_hashed_password(),
                    user.hashed_password_data.get_salt()
                )
            )
            cursor.close()
            self.db.commit()

            return True

        except Exception as error:
            raise Exception(error)

    def get_user_info_from_email_and_password(self, email: str, password: str):
        """Gets the User ID for the given email and password combo if a user exists."""
        try:
            cursor = self.db.cursor(MySQLdb.cursors.DictCursor)
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
                raise Exception("Incorrect email or password")
            return user_information

        except Exception as error:
            raise Exception(error)

    def get_salt_from_email_address(self, email_address: str):
        """Gets the salt associated with the email address"""
        try:
            cursor = self.db.cursor(MySQLdb.cursors.DictCursor)
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
                raise Exception("No account found for email address")
            return salt
        except Exception as error:
            raise Exception(error)
