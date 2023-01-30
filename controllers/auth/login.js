const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../../models/user");

const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw RequestError(401, "Email or password is wrong");
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  // if (!user.verify) {
  //   throw RequestError(401, "Email is not verified");
  // }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await UserModel.findByIdAndUpdate(user._id, { token });
  res.json({
    code: 200,
    status: "success",
    data: {
      token,
      name: user.name,
      email: user.email,
    },
    message: "login was successful",
  });
};

module.exports = login;
