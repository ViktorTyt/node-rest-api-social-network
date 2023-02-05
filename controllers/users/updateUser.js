const bcrypt = require("bcrypt");

const { UserModel } = require("../../models/user");

const updateUser = async (req, res) => {
  console.log(req.user);
  console.log(req.result);
  console.log(req.postImageURL);

  // if (req.body.userId === req.params.id || req.body.isAdmin) {
  // if (req.body.password) {
  //   try {
  //     const salt = await bcrypt.genSalt(10);
  //     req.body.password = await bcrypt.hash(req.body.password, salt);
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // }

  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        profilePicture: req.postImageURL,
      },
      { new: true }
    );
    if (!user) {
      res.status(500).json({
        code: 500,
        status: "Failed",
        message: "Upload user image failed, try again",
      });
    }
    res.status(200).json({
      code: 200,
      status: "Success",
      data: {
        user,
      },
      message: "Account has been updated",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
// else {
//   return res.status(403).json("You can update only your account");
// }
// };

module.exports = updateUser;
