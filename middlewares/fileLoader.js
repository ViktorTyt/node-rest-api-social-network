const ObjectId = require("mongoose").Types.ObjectId;
const { addAvatar, setAvatarURL } = require("../services");

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const fileLoader = async (req, res, next) => {
  console.log(" line 7 in file loader".yellow.bold.italic);
  const { fileTypeFromFile } = await import("file-type");
  console.log(" line 9 in file loader".yellow.bold.italic, fileTypeFromFile);

  if (!req.file) {
    console.log(" line 12 in file loader".yellow.bold.italic);
    next();
    return;
  }
  const result = req.result;
  const { filename } = req.file;
  const URL = req.originalUrl;

  let destination = null;
  const uniqueName = ObjectId(result._id).toString().slice(0, 12);
  if (URL.length > 20) {
    destination = URL.slice(5, URL.length - 25);
  } else {
    destination = URL.slice(5, URL.length);
  }
  console.log(" 27 line destination:".yellow.bold.italic, destination);

  const meta = await fileTypeFromFile(req.file.path);
  if (!whitelist.includes(meta.mime)) {
    next(res.status(415).json({ message: "Unsupported media type" }));
  }
  console.log(" line 27 in file loader".yellow.bold.italic);

  const postImage = await addAvatar(uniqueName, filename, destination);
  console.log(" line 32 postImage:".yellow.bold.italic, postImage);

  const postImageURL = await setAvatarURL(postImage, destination);
  req.postImageURL = postImageURL;
  console.log("in file loader:".yellow.bold.italic, postImageURL);
  next();
};

module.exports = fileLoader;
