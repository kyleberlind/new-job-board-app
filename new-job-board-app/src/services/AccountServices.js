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
