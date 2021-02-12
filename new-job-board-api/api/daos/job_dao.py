"""
01/26/2020
"""

import MySQLdb
from ..api_secrets.aws_credentials import AWS_PASSWORD, AWS_USER_NAME, AWS_HOSTNAME
from ..models.job_posting.job_posting_model import JobPostingModel
from ..models.job_posting.job_location_model import JobLocationModel
from ..exceptions.dao_exceptions import JobDaoException, NoJobPostingFoundException


class JobDao():
    """Data Access object for job information"""

    def __init__(self, db=None):
        self.db = db or MySQLdb
        self.job_connection = self.db.connect(
            host=AWS_HOSTNAME,
            user=AWS_USER_NAME,
            password=AWS_PASSWORD,
            db="job"
        )

    def get_job_posting_questions(self):
        """Gets the job posting quesitions"""
        try:
            cursor = self.job_connection.cursor(self.db.cursors.DictCursor)
            cursor.execute(
                """
                    SELECT id, title, value, type, description
                    FROM job.tbl_job_posting_questions
                """
            )
            return cursor.fetchall()
        except Exception as error:
            raise Exception(error)

    def save_job_posting_general_info(self, job_posting: JobPostingModel):
        """Saves new job posting"""
        try:
            cursor = self.job_connection.cursor()
            cursor.execute(
                """
                    INSERT INTO job.tbl_job_posting (
                                    employer_id,
                                    role,
                                    description,
                                    team
                                )
                    VALUES (%s, %s, %s, %s)
                """,
                (
                    job_posting.employer_id,
                    job_posting.role,
                    job_posting.description,
                    job_posting.team
                )
            )
            new_job_id = cursor.lastrowid
            cursor.close()
            self.job_connection.commit()
            return new_job_id
        except Exception as error:
            raise Exception(error)

    def save_job_posting_location(self, job_id: int, job_location: JobLocationModel):
        """Saves new job posting"""
        try:
            cursor = self.job_connection.cursor()
            cursor.execute(
                """
                    INSERT INTO job.tbl_job_posting_location (
                                    job_id,
                                    city,
                                    state,
                                    zip_code
                                )
                    VALUES (%s, %s, %s, %s)
                """,
                (
                    job_id,
                    job_location.city,
                    job_location.state,
                    job_location.zip_code,
                )
            )
            cursor.close()
            self.job_connection.commit()
            return True
        except Exception as error:
            raise Exception(str(error))

    def update_job_posting_general_info(self, job_posting: JobPostingModel) -> bool:
        """Updates a job postings general information by ID"""
        try:
            cursor = self.job_connection.cursor(self.db.cursors.DictCursor)
            cursor.execute(
                """
                    UPDATE job.tbl_job_posting job_posting
                    SET    job_posting.role = %s
                           job_posting.description = %s
                    WHERE  job_posting.job_id = %s
                """,
                (
                    job_posting.role,
                    job_posting.description,
                    job_posting.job_id,
                    job_posting.team
                )
            )
            cursor.close()
            self.job_connection.commit()
            return True
        except Exception as error:
            raise Exception(error)

    def load_job_postings_by_employer_id(self, employer_id):
        """Loads the job postings for the employer by their ID"""
        try:
            cursor = self.job_connection.cursor(self.db.cursors.DictCursor)
            cursor.execute(
                """
                    SELECT     job_posting.id,
                               job_posting.employer_id,
                               job_posting.role,
                               job_posting.description,
                               job_posting.team,
                               job_posting.date_created,
                               location.city,
                               location.state,
                               location.zip_code
                    FROM       job.tbl_job_posting job_posting
                    INNER JOIN job.tbl_job_posting_location location
                            ON job_posting.id = location.job_id
                    WHERE      job_posting.employer_id = %s
                """,
                [employer_id]
            )
            results = cursor.fetchall()
            cursor.close()
            if results:
                return list(results)
            else:
                raise NoJobPostingFoundException(
                    "No job postings found for id " + str(employer_id))
        except Exception as error:
            raise Exception(error)
