export const isFormCreateValid = (
    adminname,
    email,
    password,
    confirmpassword,
    fullname
  ) => {
    return (
      adminname && adminname.trim() !== "" &&
      email && email.trim() !== "" &&
      password && password.trim() !== "" &&
      confirmpassword && confirmpassword.trim() !== "" &&
      fullname && fullname.trim() !== ""
    );
  };
  
  export const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  
  export const isFormEditValid = (
    email,
    password,
  ) => {
    return (
      email && email.trim() !== "" &&
      password && password.trim() !== ""
    );
  };


  export const isFormChangePassValid = (
    password,
    confirmpassword
  ) => {
    return (
      password && password.trim() !== "" &&
      confirmpassword && confirmpassword.trim() !== ""
    );
  };