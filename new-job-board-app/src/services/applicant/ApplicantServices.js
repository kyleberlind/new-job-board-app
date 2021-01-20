export const loadApplicantInfoService = () => {
  return fetch("/load_applicant_info");
};

export const searchJobPostings = (jobPostingSearchInput) => {
  return fetch("/search_job_postings", {
    method: "POST",
    body: JSON.stringify(jobPostingSearchInput),
  });
};
