const multer = require('multer');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    const avatar = `${file.fieldname}-${uniqueSuffix}.${fileExtension}`;
    req.avatar = avatar;
    cb(null, avatar);
  }
});

// Create and export multer upload instance
module.exports = multer({ storage });