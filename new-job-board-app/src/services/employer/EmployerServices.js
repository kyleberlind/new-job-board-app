export const updateJobPostingService = (jobPostingInfo) => {
  return fetch("/update_job_posting", {
    method: "POST",
    body: JSON.stringify(jobPostingInfo),
  });
};

export const deleteJobPostingService = (jobId) => {
  return fetch("/delete_job_posting", {
    method: "POST",
    body: JSON.stringify(jobId),
  });
};

export const loadJobPostingFieldsService = () => {
  return fetch("/get_job_posting_fields");
};

export const loadJobApplicantsService = (jobId) => {
  return fetch("/load_job_applications_by_job_id", {
    method: "POST",
    body: JSON.stringify(jobId),
  });
};
