const db = require("../models");
const User = db.user;

exports.create = async (req, res) => {

  try {
    await User.create({
      username: req.body.username,
      profilename: req.body.profilename,
      avatar: req.avatar
    });

  res.send({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  
};


exports.get = async (req, res) => {
  console.log('asdf');
  console.log('asdf');

  try {
    const data = await User.findOne({
      where: {id: req.body.id}
    });

    res.send({data});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  
};

exports.getAll = async (req, res) => {
  try {
    const data = await User.findAll();
    res.send({data});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  
};

exports.update = async (req, res) => {
  try {
    await User.update({
      username: req.body.username,
      profilename: req.body.profilename,
      avatar: req.avatar
    },
    {
      where: {id: req.body.id}
    });

  res.send({ message: "User Updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await User.destroy({
      where: {id: req.body.id}
    });

    res.send({data});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  
};