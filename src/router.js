const router = require("express").Router();
const multer = require("multer");

const upload = multer();

const auth = require("./middlewares/auth");
const validate = require("./middlewares/validate");

const authValidation = require("./validations/auth.validation");

const homeController = require("./controllers/home.controller");
const authController = require("./controllers/v1/auth.controller");
const userController = require("./controllers/v1/user.controller");
const predictionController = require("./controllers/v1/prediction.controller");

router.get("/", homeController.index);
router.post(
  "/v1/auth/login",
  validate(authValidation.login),
  authController.login
);
router.post(
  "/v1/auth/register",
  validate(authValidation.register),
  authController.register
);
router.get("/v1/users/:id", userController.getUser);
router.put("/v1/users/:id", auth, userController.updateUser);
router.post(
  "/v1/predictions",
  auth,
  upload.single("image"),
  predictionController.getPredictions
);

module.exports = router;
