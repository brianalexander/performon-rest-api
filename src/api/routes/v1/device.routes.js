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
const router = express.Router();

router
  .route("/")
  .get(getAllDevices)
  .post(createDevice);

router
  .route("/:deviceHash")
  .get(getDevice)
  .put(updateDevice)
  .delete(flagDeviceAsDeleted);

router
  .route("/:deviceHash/metrics")
  .get(getDeviceMetrics)
  .post(addDeviceMetrics);

module.exports = router;
