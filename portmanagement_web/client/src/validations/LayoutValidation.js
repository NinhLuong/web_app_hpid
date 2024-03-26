export const isFormCreateValid = (layoutname, layoutdir, image) => {
  return (
    layoutname &&
    layoutname.trim() !== ""
  );
};

export const isFormEditValid = (layoutname) => {
  return layoutname && layoutname.trim() !== "";
};
