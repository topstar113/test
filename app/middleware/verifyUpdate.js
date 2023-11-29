const db = require("../models");
const fs = require('fs');
const User = db.user;



validateCheck = async (req, res, next) => {
  try {
    // Profile name
    if(req.body.profilename === '' || req.body.profilename === undefined || req.body.profilename === null){
      fs.unlink(`./public/${req.file.filename}`, () => {});
      return res.status(400).send({
        message: "Failed! Profile name is required!"
      });
    }

    // Username

    if(req.body.username === '' || req.body.username === undefined || req.body.username === null){
      fs.unlink(`./public/${req.file.filename}`, () => {});
      return res.status(400).send({
        message: "Failed! Username is required!"
      });

    }

    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user && user.id != req.body.id) {
      fs.unlink(`./public/${req.file.filename}`, () => {});
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }
    // Avatar
    if (!req.file || Object.keys(req.file).length === 0) {
      return res.status(400).send({
        message: "Failed! File is required."
      });
    }

    // Access the uploaded file
    const file = req.file;

    // Check file extension
    const allowedExtensions = ['jpeg', 'png', 'jpg'];
    const fileExtension = file.originalname.split('.').pop();
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).send({
        message: "Failed! Invalid file extension. Only JPEG, JPG and PNG files are allowed."
      });
    }

    // Check file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return res.status(400).send({
        message: "Failed! File size exceeds the allowed limit of 5MB."
      });
    }

    if(user)
      fs.unlink(`./public/${user.avatar}`, () => {});
    else {
      let user1 = await User.findOne({
        where: {
          id: req.body.id
        }
      });
      fs.unlink(`./public/${user1.avatar}`, () => {});
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

const verifyUpdate = {
  validateCheck
};

module.exports = verifyUpdate;
