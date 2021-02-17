"""02/14/2021"""
from ...daos.job_dao import JobDao
from ...models.job_posting.job_posting_model import JobPostingModel
from ...utilities.mappers.job_posting_mappers import map_job_posting_info


class JobPostingProcessorModel:
    """class for processing job posting"""

    def __init__(self):
        self.dao = JobDao()

    def save_new_job_posting(self, job_posting: JobPostingModel):
        """Saves a new job posting"""
        try:
            new_job_id = self.dao.save_job_posting_general_info(job_posting)
            return self.dao.save_job_posting_location(new_job_id, job_posting.location)
        except Exception as error:
            raise Exception(error)

    def update_job_posting(self, job_posting: JobPostingModel):
        """Updates an existing job posting"""
        try:
            return self.dao.update_job_posting_general_info(job_posting) and self.dao.update_job_posting_location(job_posting)
        except Exception as error:
            raise Exception(error)

    def load_job_postings_by_employer_id(self, employer_id: int):
        """Loads the job postings for an employer ID"""
        try:
            job_postings = self.dao.load_job_postings_by_employer_id(
                employer_id
            )
            return map_job_posting_info(job_postings)
        except Exception as error:
            raise Exception(error)

    def delete_job_posting(self, job_id: int) -> bool:
        """Deletes a job posting by the job ID"""
        return self.dao.delete_job_posting(job_id)
