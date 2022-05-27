const httpStatus = require("http-status");
const handleAsync = require("../../utils/handleAsync");
const db = require("../../utils/db");
const hash = require("../../utils/hash");
const ApiError = require("../../utils/ApiError");

const getUser = handleAsync(async (req, res) => {
  const userDoc = await db.collection("users").doc(req.params.id).get();
  const user = userDoc.data();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res.json({
    error: false,
    message: "User fetched",
    data: {
      user: {
        userId: req.params.id,
        fullName: user.fullName,
        email: user.email,
      },
    },
  });
});

const updateUser = handleAsync(async (req, res) => {
  const usersRef = await db.collection("users");

  const userDoc = await usersRef.doc(req.params.id);
  let user = (await userDoc.get()).data();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (req.payload.userId !== req.params.id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You don't have permission to access this resource"
    );
  }

  const { email } = req.value;
  if (email && email !== user.email) {
    const usersRes = await usersRef.where("email", "==", email).get();
    if (usersRes.size > 0) {
      return res.json({
        error: true,
        message: "Email is already taken",
      });
    }
  }

  const { password } = req.value;
  if (password) {
    req.value.password = hash(password);
  }

  await userDoc.update(req.value);

  user = (await userDoc.get()).data();

  res.json({
    error: false,
    message: "User updated",
    data: {
      user: {
        userId: req.params.id,
        fullName: user.fullName,
        email: user.email,
      },
    },
  });
});

module.exports = { getUser, updateUser };
