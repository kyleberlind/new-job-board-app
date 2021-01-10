export const loginUserService = (emailAddress, password) => {
  const user_data = { emailAddress, password };
  return fetch("/login", {
    method: "POST",
    body: JSON.stringify(user_data),
  });
};

export const signUpUserService = (emailAddress, password, userType) => {
  const user_data = { emailAddress, password, userType };
  return fetch("/sign_up", {
    method: "POST",
    body: JSON.stringify(user_data),
  });
};

export const loadEmployerDataService = () => {
  return fetch("/load_employer_info");
};

export const loadApplicantDataService = () => {
  return fetch("/load_applicant_info");
}

export const getSessionService = () => {
  return fetch("/get_session");
};

export const logoutService = () => {
  return fetch("/logout");
};
