const handleAsync = require("../../utils/handleAsync");

const exampleUsers = [
  {
    id: 1,
    fullName: "Pat Metheny",
    email: "patmetheny@example.com",
  },
  {
    id: 2,
    fullName: "Allan Holdsworth",
    email: "allan@example.com",
  },
  {
    id: 3,
    fullName: "Plini",
    email: "plini@example.com",
  },
];

const getUser = handleAsync(async (req, res) => {
  const user = exampleUsers.filter(({ id }) => id == req.params.id)[0];
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  res.json({
    error: false,
    message: "User fetched successfully",
    user,
  });
});

const updateUser = handleAsync(async (req, res) => {
  const user = exampleUsers.filter(({ id }) => id == req.params.id)[0];
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  res.json({
    error: false,
    message: "User updated successfully",
    user,
  });
});

module.exports = { getUser, updateUser };
