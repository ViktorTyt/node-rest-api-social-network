const router = require("express").Router();
const ctrl = require("../../controllers/messages");
const { authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

//add new message
router.post("/", authenticate, ctrlWrapper(ctrl.addMessage));

//get by conversation
router.get(
  "/:conversationId",
  authenticate,
  ctrlWrapper(ctrl.getMessageByConversation)
);

module.exports = router;
