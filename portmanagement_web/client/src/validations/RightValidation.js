// export const isFormEditValid = (email, password) => {
//   return email && email.trim() !== "" && password && password.trim() !== "";
// };

export const isFormEditRightValid = (right) => {
  if (typeof right !== "string") {
    return false;
  }
  return right.trim() !== "";
};