export const isFormCreateValid = (layoutname, username, status) => {
  return (
    layoutname &&
    layoutname.trim() !== "" &&
    username &&
    username.trim() !== "" &&
    status &&
    status.trim() !== ""
  );
};
