const jwt = require("jsonwebtoken");

const { RequestError } = require("../helpers");

const { UserModel } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw RequestError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await UserModel.findById(id);
      if (!user || !user.token) {
        throw Error("Unauthorized");
      }
      req.user = user;
      // console.log(req.user);

      next();
    } catch (error) {
      throw RequestError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
