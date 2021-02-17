export const loadEmployerInfoService = () => {
  return fetch("/load_employer_info");
};

export const saveNewJobPostingService = (jobPostingInfo) => {
  return fetch("/save_new_job_posting", {
    method: "POST",
    body: JSON.stringify(jobPostingInfo),
  });
};

export const updateJobPostingService = (jobPostingInfo) => {
  return fetch("/update_job_posting", {
    method: "POST",
    body: JSON.stringify(jobPostingInfo),
  });
}

export const loadJobPostingsByEmployerIdService = (employer_id) => {
  return fetch("/load_job_postings_by_employer_id", {
    method: "POST",
    body: JSON.stringify(employer_id),
  });
};

export const deleteJobPostingService = (jobId) => {
  return fetch("/delete_job_posting", {
    method: "POST",
    body: JSON.stringify(jobId),
  });
}
