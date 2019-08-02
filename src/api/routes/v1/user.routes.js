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
  .route("/:uuid")
  .get(getUser)
  .put(updateUser)
  .delete(flagUserAsDeleted);

router.route("/:uuid/devices").get(getAllDevicesForUser);

module.exports = router;
