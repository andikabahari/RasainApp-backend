const router = require("express").Router();
const multer = require("multer");

const upload = multer();

const auth = require("./middlewares/auth");

const homeController = require("./controllers/home.controller");
const authController = require("./controllers/v1/auth.controller");
const userController = require("./controllers/v1/user.controller");
const predictionController = require("./controllers/v1/prediction.controller");

router.get("/", homeController.index);
router.post("/v1/auth/login", authController.login);
router.post("/v1/auth/register", authController.register);
router.get("/v1/users/:id", userController.getUser);
router.put("/v1/users/:id", auth, userController.updateUser);
router.post(
  "/v1/prediction",
  auth,
  upload.single("image"),
  predictionController.getPrediction
);

module.exports = router;
