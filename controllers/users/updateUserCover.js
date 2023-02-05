const { UserModel } = require("../../models/user");

const updateUserCover = async (req, res) => {
  // console.log(req.user);
  // console.log(req.result);
  // console.log(req.postImageURL);
  // console.log(req.file.fieldname);

  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        coverPicture: req.postImageURL,
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

module.exports = updateUserCover;
