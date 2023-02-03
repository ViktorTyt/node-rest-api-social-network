const Post = require("../../models/post");
const { UserModel } = require("../../models/user");

const crePost = async (userID, post) => {
  const newPost = await Post.create({ ...post });
  const updateUser = await UserModel.findByIdAndUpdate(
    { _id: userID },
    { $push: { posts: newPost._id } }
  );
  if (newPost && updateUser) {
    return newPost;
  }
};
const createPost = async (req, res, next) => {
  const user = req.user;

  const post = req.body; // замість пет

  const newPost = await crePost(user._id, post);

  req.result = newPost;
  next();
};

// const createPost = async (req, res, next) => {
//   // console.log(req);
//   const newPost = new Post(req.body);
//   console.log(newPost);
//   try {
//     const savedPost = await newPost.save();
//     res.status(201).json(savedPost);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

module.exports = createPost;
