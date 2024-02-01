export const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;

  return regex.test(email);
};

export const emailValidationMessage = "Please eneter a valid email address";
