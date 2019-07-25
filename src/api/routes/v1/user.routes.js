const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  getAllUsers,
  getAllDevicesForUser,
  flagUserAsDeleted
} = require("../../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

router
  .route("/:userUUID")
  .get(getUser)
  .put(updateUser)
  .delete(flagUserAsDeleted);

router.route("/:userUUID/devices").get(getAllDevicesForUser);

module.exports = router;
