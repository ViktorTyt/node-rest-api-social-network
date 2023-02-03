const { UserModel } = require("../../models/user");

const getUser = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  // const username = req.query.username;
  try {
    const user = await UserModel.findById(_id);

    res.status(200).json({
      code: 200,
      status: "Success",
      data: {
        name: user.name,
        profilePicture: user.profilePicture,
      },
      message: "request completed successfully",
    });
  } catch (error) {
    console.log("in error getUser");
    res.status(500).json(error);
  }
};

module.exports = getUser;
