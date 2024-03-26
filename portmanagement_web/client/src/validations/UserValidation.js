// formValidation.js
export const isFormCreateValid = (username, email, group) => {
  return (
    username &&
    username.trim() !== "" &&
    email &&
    email.trim() !== "" &&
    group &&
    group.trim() !== "" 
  );
};

export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
};

export const isFormEditValid = (username, email, group) => {
  return email && email.trim() !== "" && username && username.trim() !== "" && group && group.trim() !== "";
};
