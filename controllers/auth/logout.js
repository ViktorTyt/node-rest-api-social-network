const { UserModel } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await UserModel.findByIdAndUpdate(_id, { token: null });
  res.status(200).json({
    code: 200,
    status: "success",
    message: "logout success",
  });
};

module.exports = logout;
