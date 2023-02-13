const { UserModel } = require("../../models/user.js");

const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    console.log(req.body.userId);
    console.log(req.params.id);
    try {
      const user = await UserModel.findById(req.params.id);
      console.log("first");
      const currentUser = await UserModel.findById(req.body.userId);
      console.log("second");

      if (!user.followers.includes(req.body.userId)) {
        console.log("third");

        await user.updateOne({ $push: { followers: req.body.userId } });
        console.log("fourth");
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        console.log("fifth");
        res.status(200).json("user has been followed");
      } else {
        console.log("this one");
        res.status(403).json("You allready follow this user");
      }
    } catch (error) {
      console.log("this two");
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
};

module.exports = followUser;
