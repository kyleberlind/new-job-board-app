from ...daos.job_dao import JobDao
from ...models.job_posting.job_posting_model import JobPostingModel

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
            raise Exception from error

    def update_job_posting(self, job_posting: JobPostingModel):
        """Updates an existing job posting"""
        try:
            return self.dao.update_job_posting_general_info(job_posting)
        except Exception as error:
            raise Exception from error
