export const loginUserService = (emailAddress, password) => {
  const user_data = { emailAddress, password };
  return fetch("/login", {
    method: "POST",
    body: JSON.stringify(user_data),
  });
};

export const signUpApplicantService = (applicantData, userType) => {
  const user_data = { ...applicantData, userType };
  return fetch("/sign_up_applicant", {
    method: "POST",
    body: JSON.stringify(user_data),
  });
};


export const signUpEmployerService = (employerData, userType) => {
  const employer_data = {...employerData, userType};
  return fetch("/sign_up_employer", {
    method: "POST",
    body: JSON.stringify(employer_data),
  });
};


export const getSessionService = () => {
  return fetch("/get_session");
};

export const logoutService = () => {
  return fetch("/logout");
};
