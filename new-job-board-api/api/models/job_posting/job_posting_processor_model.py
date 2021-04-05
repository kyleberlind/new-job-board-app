"""02/14/2021"""
from ...daos.job_dao import JobDao
from ...models.job_posting.job_posting_model import JobPostingModel
from ...utilities.mappers.job_posting_mappers import map_job_posting_info, map_job_posting_info_json, map_job_applications


class JobPostingProcessorModel:
    """Class for processing job postings"""

    def __init__(self):
        self.dao = JobDao()

    def update_job_posting(self, job_posting: JobPostingModel):
        """Updates an existing job posting"""
        try:
            return self.dao.update_job_posting_general_info(job_posting.general_info) and\
                self.dao.update_job_posting_location(
                    job_posting.general_info.id, job_posting.location) and\
                self.dao.update_job_posting_fields(
                    job_posting.general_info.id, job_posting.job_posting_fields)
        except Exception as error:
            raise error

    def delete_job_posting(self, job_id: int) -> bool:
        """Deletes a job posting by the job ID"""
        try:
            return self.dao.delete_job_posting(job_id) and\
                self.dao.delete_job_posting_location(job_id) and\
                self.dao.delete_job_posting_fields(job_id)
        except Exception as error:
            raise error

    def search_job_postings(self, job_search_query: str, job_search_location_query: str):
        """Searches for a job posting by key word or location"""
        job_postings = self.dao.search_job_postings(
            job_search_query, job_search_location_query)
        return map_job_posting_info(job_postings)

    def load_job_posting_by_job_id(self, job_id: int):
        """Loads a job posting by Job ID"""
        job_postings = self.dao.load_job_posting_by_job_id(job_id)
        return map_job_posting_info_json(job_postings)

    def get_job_posting_fields(self):
        """gets the job posting fields"""
        try:
            return self.dao.get_job_posting_fields()
        except Exception as error:
            raise error

    def load_job_applications_by_job_id(self, job_id: int) -> list:
        """Loads the applications for the job ID"""
        try:
            applications = self.dao.load_job_applications_by_job_id(job_id)
            return map_job_applications(applications)
        except Exception as error:
            raise error

    def load_job_application_by_employer_reference_id(self, employer_reference_id: str):
        """Loads the application for the employer be reference ID"""
        try:
            application = self.dao.load_job_application_by_employer_reference_id(
                employer_reference_id)
            return application
        except Exception as error:
            raise error
