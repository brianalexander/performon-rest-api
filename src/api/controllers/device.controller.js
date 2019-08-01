// const { User } = require("../models/User.model");
const { Device } = require("../models/Device.model");

async function getDevice(req, res, next) {
  try {
    const deviceArray = await Device.query().where(
      "hash_id",
      req.params.deviceHash
    );
    if (deviceArray.length === 0) {
      res.status(404).json({ Error: "User not found." });
    }
    res.status(200).json(deviceArray[0]);
  } catch (err) {
    console.log(err);
  }
}

async function getAllDevices(req, res, next) {
  try {
    const devices = await Device.query();
    res.status(200).json(devices);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: err });
  }
}

async function createDevice(req, res, next) {
  console.log("creating device...");
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: err });
  }
}

async function updateDevice(req, res, next) {
  console.log("updating device...");
  try {
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
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: err });
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
