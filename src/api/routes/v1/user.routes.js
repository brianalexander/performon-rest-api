const express = require("express");

const {
  getUser,
  createUser,
  updateUser,
  getAllUsers,
  getAllDevicesForUser,
  deleteUser
} = require("../../controllers/user.controller");

const { exceptionHandler } = require("../../utils/errors");

const router = express.Router();

router
  .route("/")
  .get(exceptionHandler(getAllUsers))
  .post(exceptionHandler(createUser));

router
  .route("/:uuid")
  .get(exceptionHandler(getUser))
  .put(exceptionHandler(updateUser))
  .delete(exceptionHandler(deleteUser));

router.route("/:uuid/devices").get(exceptionHandler(getAllDevicesForUser));

module.exports = router;
