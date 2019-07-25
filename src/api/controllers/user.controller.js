const { User } = require("../models/User.model");
const { Device } = require("../models/Device.model");
const uuidv4 = require("uuid/v4");

//
// Route Functions
//
async function getAllUsers(req, res, next) {
  console.log("getAllUsers");
  if (req.query.online !== undefined) {
    res.status(201).json({ message: `Handling request to /users?online=true` });
  } else {
    const users = await User.query();
    res.status(200).json(users);
  }
}
async function getUser(req, res, next) {
  console.log(req.params);
  try {
    const userArray = await User.query().where("uuid", req.params.userUUID);
    if (userArray.length === 0) {
      res.status(404).json({ Error: "User not found." });
    }
    res.status(200).json(userArray[0]);
  } catch (err) {
    console.log(err);
  }
}

async function getAllDevicesForUser(req, res, next) {
  try {
    const userArray = await User.query()
      .where("uuid", req.params.userUUID)
      .eager("devices");
    if (userArray.length === 0) {
      res.status(404).json({ Error: "User not found." });
    }
    const [user] = userArray;

    const devices = user.devices.map(device => {
      return {
        id: device.id,
        hashId: device.hash_id,
        osType: device.os_type,
        cpuModel: device.cpu_model,
        totalMem: device.total_mem,
        numLogicalCores: device.num_logical_cores,
        cpuSpeed: device.cpu_speed,
        userUUID: device.user_uuid
      };
    });
    console.log(devices);

    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
}

async function createUser(req, res, next) {
  console.log("POST /user", req.body);
  try {
    const uuid = uuidv4();
    const newUser = await User.query().insert({ uuid: uuid });
    console.log("user inserted");
    res.status(201).json({
      user: newUser,
      url: `http://localhost:9090/v1/users/${uuid}`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: err });
  }
}

async function updateUser(req, res, next) {
  console.log("updateUser");
  try {
    const numUpdated = await User.query()
      .update({})
      .where("uuid", req.params.userUUID);
    console.log(numUpdated);
    if (numUpdated === 1) {
      console.log("successfully updated");
      res.sendStatus(204);
    } else if (numUpdated === 0) {
      console.log("user not found");
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
      console.log("critical", ":", "More than one user updated.");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function flagUserAsDeleted(req, res, next) {}

module.exports = {
  getUser,
  createUser,
  updateUser,
  getAllUsers,
  getAllDevicesForUser,
  flagUserAsDeleted
};
