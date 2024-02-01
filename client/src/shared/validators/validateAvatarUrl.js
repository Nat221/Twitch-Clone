export const validateAvatarUrl = (url) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;

  return regex.test(url);
};

export const urlValidationMessage = "Please enter a valid URL";
