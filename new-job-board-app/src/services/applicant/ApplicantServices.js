export const loadApplicantInfoService = () => {
  return fetch("/load_applicant_info");
};

export const loadApplicantInfoFromId = (accountId) => {
  return fetch("/load_applicant_info_from_id", {
    method: "POST",
    body: JSON.stringify(accountId),
  });
};

export const loadApplicantJobApplicationsFromId = (accountId) => {
  return fetch("/load_applicant_job_applications_from_id", {
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

export const addPostingToJobCart = (jobCartInput) => {
  return fetch("/add_posting_to_job_cart", {
    method: "POST",
    body: JSON.stringify(jobCartInput),
  });
}

export const loadJobCart = () => {
  return fetch("/load_job_cart");
}

export const checkoutJobCart = () => {
  return fetch("/checkout_job_cart", {
    method: "GET",
  });
}
