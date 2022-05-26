const handleAsync = require("../../utils/handleAsync");
const db = require("../../utils/db");

const getUser = handleAsync(async (req, res) => {
  const user = await db.collection("users").where(doc.id, '==', req.params.id).get();
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  res.json({
    error: false,
    message: "User found",
    data: { user },
  });
});

const updateUser = handleAsync(async (req, res) => {
  //const user = exampleUsers.filter(({ id }) => id == req.params.id)[0];
  const user = await db.collection("users").where(doc.id, '==', req.params.id).get();
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  res.json({
    error: false,
    message: "User updated",
    data: { user },
  });
});

module.exports = { getUser, updateUser };
