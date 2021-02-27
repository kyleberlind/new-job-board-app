"""02/14/2021"""
from ...daos.job_dao import JobDao
from ...models.job_posting.job_posting_model import JobPostingModel
from ...utilities.mappers.job_posting_mappers import map_job_posting_info, map_job_applications


class JobPostingProcessorModel:
    """Class for processing job postings"""

    def __init__(self):
        self.dao = JobDao()

    def save_new_job_posting(self, job_posting: JobPostingModel):
        """Saves a new job posting"""
        try:
            new_job_id = self.dao.save_job_posting_general_info(
                job_posting.general_info)
            return self.dao.save_job_posting_location(new_job_id, job_posting.location) and\
                self.dao.save_job_posting_fields(
                    new_job_id, job_posting.job_posting_fields)
        except Exception as error:
            raise error

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

    def load_job_postings_by_employer_id(self, employer_id: int):
        """Loads the job postings for an employer ID"""
        try:
            job_postings = self.dao.load_job_postings_by_employer_id(
                employer_id
            )
            job_posting_fields_for_employer = self.dao.load_job_posting_fields_by_employer_id(
                employer_id)
            job_posting_field_dict = self.build_job_posting_field_dict(
                job_posting_fields_for_employer)
            merged_job_postings = self.merge_job_posting_with_fields(
                job_postings, job_posting_field_dict)
            return map_job_posting_info(merged_job_postings)
        except Exception as error:
            raise error

    def build_job_posting_field_dict(self, job_posting_fields_list: list) -> dict:
        """Builds the mapping dict between the job id and the job posting fields"""
        try:
            job_posting_field_dict = {}
            for record in job_posting_fields_list:
                if record["job_id"] not in job_posting_field_dict:
                    job_posting_field_dict[record["job_id"]] = []
                job_posting_field_dict[record["job_id"]].append(record)
            return job_posting_field_dict
        except Exception as error:
            raise error

    def merge_job_posting_with_fields(
        self,
        job_postings: list,
        job_posting_field_dict: dict
    ) -> list:
        """Merges the job postings list with the job posting fields for each job id"""
        try:
            for record in job_postings:
                record["fields"] = job_posting_field_dict[record["id"]]\
                    if record["id"] in job_posting_field_dict\
                    else []
            return job_postings
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
        return map_job_posting_info(job_postings)

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
