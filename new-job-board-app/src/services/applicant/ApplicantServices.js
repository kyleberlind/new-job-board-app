export const loadApplicantInfoService = () => {
  return fetch("/load_applicant_info");
};

export const loadApplicantInfoFromId = (accountId) => {
  return fetch("/load_applicant_info_from_id", {
    method: "POST",
    body: JSON.stringify(accountId),
  });
};

export const searchJobPostings = (jobPostingSearchInput) => {
  return fetch("/search_job_postings", {
    method: "POST",
    body: JSON.stringify(jobPostingSearchInput),
  });
};
