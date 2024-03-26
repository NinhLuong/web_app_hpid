const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = process.env.UPLOAD_DIR_CSV;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
    console.log("Saved");
  },
});

const csvFilter = (req, file, callback) => {
  if (req.query.csv === 'true') {
    console.log("Reading file in middleware", file.originalname);
    if (!file) {
      callback("Please upload a file to proceed.", false);
    } else if (file.mimetype.includes("csv")) {
      callback(null, true);
    } else {
      callback("Please upload only csv file as only CSV is supported for now.", false);
    }
  } 
  else {
    callback(null, false);
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: csvFilter,
});