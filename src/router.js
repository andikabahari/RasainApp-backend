const router = require("express").Router();

const homeController = require("./controllers/home.controller");
const loginController = require("./controllers/v1/login.controller");
const registerController = require("./controllers/v1/register.controller");
const userController = require("./controllers/v1/user.controller");

router.get("/", homeController.index);
router.post("/v1/login", loginController.login);
router.post("/v1/register", registerController.register);
router.get("/v1/users", userController.all);
router.get("/v1/users/:id", userController.find);

module.exports = router;
