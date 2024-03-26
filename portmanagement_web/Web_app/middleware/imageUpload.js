const fs = require('fs');
const multer = require('multer');
const LayoutModel = require("../models/layout");

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']; 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = process.env.UPLOAD_DIR_LAYOUT_IMAGE;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
  filename: async (req, file, callback) => {
      let maxIdLayout = await LayoutModel.findOne({}, { id: 1 }).sort({ id: -1 });
      maxIdLayout = (maxIdLayout && maxIdLayout.id + 1) || 1;
      file.originalname = maxIdLayout + "_" + file.originalname;
      callback(null, `${file.originalname}`);
      console.log("Saved");
  },
});

const imageFilter = (req, file, callback) => {
  console.log("Reading file in middleware", file.originalname);
  console.log(file)
  if (!file) {
    if(req.method == "PATCH"){
      callback(null, false);
    }
    callback("Please upload a file to proceed.", false);
  } else if (imageMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback("Please upload only image file as only IMAGE is supported for now.", false);
  } 
};

module.exports = multer({
  storage: storage,
  fileFilter: imageFilter,
});
