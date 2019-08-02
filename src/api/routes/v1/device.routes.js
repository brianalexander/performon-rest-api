const express = require("express");

const {
  getAllDevices,
  createDevice,
  getDevice,
  updateDevice,
  flagDeviceAsDeleted,
  getDeviceMetrics,
  addDeviceMetrics
} = require("../../controllers/device.controller");

const { exceptionHandler } = require("../../utils/errors");

const router = express.Router();

router
  .route("/")
  .get(exceptionHandler(getAllDevices))
  .post(exceptionHandler(createDevice));

router
  .route("/:deviceHash")
  .get(exceptionHandler(getDevice))
  .put(exceptionHandler(updateDevice))
  .delete(exceptionHandler(flagDeviceAsDeleted));

router
  .route("/:deviceHash/metrics")
  .get(exceptionHandler(getDeviceMetrics))
  .post(exceptionHandler(addDeviceMetrics));

module.exports = router;
