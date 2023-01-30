const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../../models/user");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const candidate = await UserModel.findOne({ email });
  if (candidate) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const profilePicture = gravatar.url(email);
  // let verificationToken;
  // try {
  //   verificationToken = uuidv4();
  // } catch (error) {
  //   console.log(error);
  // }
  const user = await UserModel.create({
    name,
    email,
    password: hashPassword,
    profilePicture,
    // verificationToken,
  });
  // const mail = createVerifyEmail(email, verificationToken);
  // await sendEmail(mail);
  res.status(201).json({
    code: 201,
    status: "success",
    data: user,

    message: "Registration success",
  });
};

module.exports = register;
