const { verifyCreate, verifyUpdate } = require("../middleware");
const controller = require("../controllers/auth.controller");
const multer = require('../middleware/upload');


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/create",
    [
      multer.single('file'),
      verifyCreate.validateCheck,
    ],
    controller.create
  );

  app.get(
    "/api/auth/get",
    controller.get
  );

  app.get(
    "/api/auth/getAll",
    controller.getAll
  );

  app.post(
    "/api/auth/update",
    [
      multer.single('file'),
      verifyUpdate.validateCheck,
    ],
    controller.update 
  );

  app.post(
    "/api/auth/delete",
    controller.delete 
  );
};

