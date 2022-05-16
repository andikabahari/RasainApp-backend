const router = require("express").Router();

const homeController = require("./controllers/home.controller");
const authController = require("./controllers/v1/auth.controller");
const userController = require("./controllers/v1/user.controller");

router.get("/", homeController.index);
router.post("/v1/auth/login", authController.login);
router.post("/v1/auth/register", authController.register);
router.get("/v1/users", userController.all);
router.get("/v1/users/:id", userController.find);

module.exports = router;
