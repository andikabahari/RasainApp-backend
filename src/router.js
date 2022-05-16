const router = require("express").Router();
const multer = require("multer");

const upload = multer();

const homeController = require("./controllers/home.controller");
const authController = require("./controllers/v1/auth.controller");
const userController = require("./controllers/v1/user.controller");
const foodController = require("./controllers/v1/food.controller");

router.get("/", homeController.index);
router.post("/v1/auth/login", authController.login);
router.post("/v1/auth/register", authController.register);
router.get("/v1/users/:id", userController.getUser);
router.put("/v1/users/:id", userController.updateUser);
router.post(
  "/v1/foods/prediction",
  upload.single("image"),
  foodController.predict
);

/**
 * FOR TESTING PURPOSE ONLY
 */
router.get("/upload", (req, res) => {
  res
    .writeHead(200, { "Content-Type": "text/html" })
    .end(
      "<!DOCTYPE HTML><html><body>" +
        "<form method='post' action='/v1/foods/prediction' enctype='multipart/form-data'>" +
        "<input type='file' name='image'/>" +
        "<input type='submit' /></form>" +
        "</body></html>"
    );
});

module.exports = router;
