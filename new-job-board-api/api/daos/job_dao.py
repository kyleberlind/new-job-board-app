"""
01/26/2020
"""

import MySQLdb
from ..api_secrets.aws_credentials import AWS_PASSWORD, AWS_USER_NAME, AWS_HOSTNAME
from ..models.job_posting.job_posting_model import JobPostingModel
from ..models.job_posting.job_posting_location_model import JobPostingLocationModel
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
                    job_posting.general_info.employer_id,
                    job_posting.general_info.role,
                    job_posting.general_info.description,
                    job_posting.general_info.team
                )
            )
            new_job_id = cursor.lastrowid
            cursor.close()
            self.job_connection.commit()
            return new_job_id
        except Exception as error:
            raise Exception(error)

    def save_job_posting_location(self, job_id: int, job_location: JobPostingLocationModel):
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
                    SET    job_posting.role = %s,
                           job_posting.description = %s,
                           job_posting.team = %s
                    WHERE  job_posting.id = %s
                """,
                (
                    job_posting.general_info.role,
                    job_posting.general_info.description,
                    job_posting.general_info.team,
                    job_posting.general_info.id
                )
            )
            cursor.close()
            self.job_connection.commit()
            return True
        except Exception as error:
            raise Exception(error)

    def update_job_posting_location(self, job_posting: JobPostingModel) -> bool:
        """Updates a job posting location"""
        try:
            cursor = self.job_connection.cursor(self.db.cursors.DictCursor)
            cursor.execute(
                """
                    UPDATE job.tbl_job_posting_location job_posting_location
                    SET    job_posting_location.city = %s,
                           job_posting_location.state = %s,
                           job_posting_location.zip_code = %s
                    WHERE  job_posting_location.job_id = %s
                """,
                (
                    job_posting.location.city,
                    job_posting.location.state,
                    job_posting.location.zip_code,
                    job_posting.general_info.id
                )
            )
            cursor.close()
            self.job_connection.commit()
            return True
        except Exception as error:
            raise Exception(error)

    def delete_job_posting(self, job_id: int) -> bool:
        """Delete job posting"""
        try:
            cursor = self.job_connection.cursor()
            cursor.execute(
                """
                    DELETE FROM job.tbl_job_posting job_posting
                    WHERE job_posting.id = %s
                """,
                [
                    job_id
                ]
            )
            cursor.close()
            self.job_connection.commit()
            return True
        except Exception as error:
            raise Exception(error)

    def load_job_postings_by_employer_id(self, employer_id: int):
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
            return list(results)
        except Exception as error:
            raise Exception(error)

    def load_job_posting_by_id(self, job_id):
        """Loads the job postings for the employer by their ID"""
        try:
            cursor = self.job_connection.cursor(self.db.cursors.DictCursor)
            cursor.execute(
                """
                    SELECT     job_posting.id,
                               job_posting.employer_id,
                               job_posting.role,
                               job_posting.description,
                               job_posting.date_created,
                               location.city,
                               location.state,
                               location.zip_code
                    FROM       job.tbl_job_posting job_posting
                    INNER JOIN job.tbl_job_posting_location location
                            ON job_posting.id = location.job_id
                    WHERE      job_posting.id = %s
                """,
                [job_id]
            )
            results = cursor.fetchall()
            cursor.close()
            if results:
                return list(results)
            else:
                raise Exception(
                    "No job postings found for id " + str(job_id))
        except Exception as error:
            raise Exception(error)

    def search_job_postings(self, job_posting_search_query, job_location_search_query):
        """Loads the job postings for the employer by their ID"""
        if (len(job_posting_search_query) == 0) & (len(job_location_search_query) == 0):
            raise Exception(
                "No search query input data provided")
        cursor = self.job_connection.cursor(self.db.cursors.DictCursor)
        query = """
                SELECT     job_posting.id,
                           job_posting.employer_id,
                           job_posting.role,
                           job_posting.description,
                           job_posting.date_created,
                           location.city,
                           location.state,
                           location.zip_code,
                           employer.employer_name
                FROM       job.tbl_job_posting job_posting
                INNER JOIN job.tbl_job_posting_location location
                        ON job_posting.id = location.job_id
                INNER JOIN user.tbl_employer employer
                        ON job_posting.employer_id = employer.employer_id
            """
        if (len(job_posting_search_query) > 0) & (len(job_location_search_query) > 0):
            job_posting_search_query = "%" + job_posting_search_query.lower() + "%"
            job_location_search_query = "%" + job_location_search_query.lower() + "%"
            query += """
                    WHERE
                        (
                            job_posting.role LIKE %s
                            OR employer.employer_name LIKE  %s
                        )
                        AND
                        (
                            location.city LIKE %s
                            OR location.state LIKE %s
                            OR location.zip_code LIKE %s
                        )
                """
            params = [
                job_posting_search_query,
                job_posting_search_query,
                job_location_search_query,
                job_location_search_query,
                job_location_search_query
            ]
        elif len(job_posting_search_query) > 0:
            job_posting_search_query = "%" + job_posting_search_query.lower() + "%"
            query += """
                    WHERE   job_posting.role LIKE %s
                            OR employer.employer_name LIKE  %s
                """
            params = [
                job_posting_search_query,
                job_posting_search_query
            ]
        elif len(job_location_search_query) > 0:
            job_location_search_query = "%" + job_location_search_query.lower() + "%"
            query += """
                WHERE   location.city LIKE %s
                        OR location.state LIKE %s
                        OR location.zip_code LIKE %s
            """
            params = [
                job_location_search_query,
                job_location_search_query,
                job_location_search_query
            ]
        try:
            cursor.execute(
                query,
                params
            )
            results = cursor.fetchall()
            cursor.close()
            if results:
                return list(results)
            else:
                return []
        except Exception as error:
            raise Exception(error)

    def submit_job_applications(self, job_applications, applicant_id):
        """Loads the job postings for the employer by their ID"""
        try:
            cursor = self.job_connection.cursor(self.db.cursors.DictCursor)
            for job in job_applications:
                params = [
                        job['id'],
                        applicant_id,
                        job['employer_id'],
                ]
                cursor.execute(
                    """
                        INSERT INTO job.tbl_job_posting_applications (job_id, applicant_id, employer_id)
                        VALUES (%s, %s, %s)
                    """,
                    params,
                )
                # Add some response

            self.job_connection.commit()
        except Exception as error:
            raise Exception(error)
