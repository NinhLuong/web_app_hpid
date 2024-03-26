export const isFormCreateValid = (
    layoutname,
    portname,
    status
  ) => {
    return (
        layoutname && layoutname.trim() !== "" &&
        portname && portname.trim() !== "" &&
        status && status.trim() !== "" )
  };