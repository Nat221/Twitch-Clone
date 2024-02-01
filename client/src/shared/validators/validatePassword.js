export const validatePassword = (password) => {
  const regex = /^\S{6,12}$/;

  return regex.test(password);
};

export const passwordValidationMessage =
  "Password shoule have beetween 6 and 12 characters. No spaces are allowed";
