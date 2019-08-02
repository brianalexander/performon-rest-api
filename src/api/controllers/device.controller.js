const { Device } = require("../models/Device.model");
const { DeviceNotFoundError } = require("../utils/errors");

async function getDevice(req, res, next) {
  const deviceArray = await Device.query().where(
    "hash_id",
    req.params.deviceHash
  );

  if (deviceArray.length === 0) {
    throw new DeviceNotFoundError;
  }

  res.status(200).json(deviceArray[0]);
}

async function getAllDevices(req, res, next) {
  const devices = await Device.query();
  res.status(200).json(devices);
}

async function createDevice(req, res, next) {
  console.log("creating device...");
  const newDevice = await Device.query().insert({
    hash_id: req.body.hash,
    os_type: req.body.osType,
    cpu_model: req.body.cpuModel,
    num_logical_cores: req.body.numLogicalCores,
    cpu_speed: req.body.cpuSpeed,
    total_mem: req.body.totalMem,
    user_uuid: req.body.userUUID
  });

  res.status(201).json({
    device: newDevice,
    url: `http://localhost:9090/v1/devices/${req.body.hash}`
  });
}

async function updateDevice(req, res, next) {
  console.log("updating device...");

  const numUpdated = await Device.query()
    .update({
      os_type: req.body.osType,
      cpu_model: req.body.cpuModel,
      num_logical_cores: req.body.numLogicalCores,
      cpu_speed: req.body.cpuSpeed,
      total_mem: req.body.totalMem,
      user_uuid: req.body.userUUID
    })
    .where("hash_id", req.body.hash);
  console.log("NUMUPDATED", numUpdated);
  if (numUpdated === 1) {
    res.sendStatus(204);
  } else if (numUpdated === 0) {
    throw new DeviceNotFoundError;
  } else {
    throw new CriticalError("More than one device updated.");
  }
}

async function flagDeviceAsDeleted(req, res, next) {}
async function getDeviceMetrics(req, res, next) {}
async function addDeviceMetrics(req, res, next) {}

module.exports = {
  getAllDevices,
  createDevice,
  getDevice,
  updateDevice,
  flagDeviceAsDeleted,
  getDeviceMetrics,
  addDeviceMetrics
};
