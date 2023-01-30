const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enaum: [1, 2, 3],
    },
    token: {
      type: String,
      default: null,
    },
    // verificationToken: {
    //   type: String,
    //   required: [true, "Verify token is required"],
    // },
  },
  { timestamps: true, versionKey: false }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  // subscription: Joi.string(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateStatusSchema = Joi.object({
  subscription: Joi.string().messages({
    "any.required": "missing required subscription field",
  }),
});

const schemas = {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  updateStatusSchema,
};

const UserModel = model("user", userSchema);

module.exports = {
  UserModel,
  schemas,
};
