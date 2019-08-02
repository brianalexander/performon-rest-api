// const { Device } = require("../models/Device.model");
const { User } = require("../models/User.model");
const { UserNotFoundError } = require("../utils/errors");
const uuidv4 = require("uuid/v4");

/**
 * @api {get} /users/:uuid Get and return user's data
 * @apiVersion 0.0.1
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission None
 *
 * @apiParam {String} uuid User's unique ID.
 *
 * @apiSuccess {String}         uuid        User's unique ID.
 * @apiSuccess {Timestamp}      created_at  Time user was created.
 * @apiSuccess {Timestamp}      updated_at  Time user was updated.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "uuid": "FILL-IN",
 *        "created_at": "FILL-IN",
 *        "updated_at": "FILL-IN"
 *      }
 *
 * @apiError UserNotFound The <code>uuid</code> of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "UserNotFound"
 *      }
 */

/**
 * This function is the controller for the get route /v1/users/:uuid.
 * Retrieves user's data from database and returns it.
 *
 * @function
 * @async
 *
 * @param {Object} req The incoming request object.
 * @param {Object} req.params Parameters parsed from the address bar.
 * @param {String} req.params.uuid Requested user's uuid.
 * @param {Object} res The outgoing response object.
 * @param {Object} next Express object, continues to next middleware.
 */
async function getUser(req, res, next) {
  const userArray = await User.query().where("uuid", req.params.uuid);
  if (userArray.length === 0) {
    throw new UserNotFoundError();
  }
  res.status(200).json(userArray[0]);
}

/**
 * @api {post} /users Creates and returns a unique user.
 * @apiVersion 0.0.1
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission None
 *
 *
 * @apiSuccess {String}         uuid        User's unique ID.
 * @apiSuccess {Timestamp}      created_at  Time user was created.
 * @apiSuccess {Timestamp}      updated_at  Time user was updated.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 Created
 *      {
 *        "uuid": "FILL-IN",
 *        "created_at": "FILL-IN",
 *        "updated_at": "FILL-IN"
 *      }
 */

/**
 * This function is the controller for the post route /v1/users/.
 * Creates and returns a unique user.
 *
 * @function
 * @async
 *
 * @param {Object} req The incoming request object.
 * @param {Object} res The outgoing response object.
 * @param {Object} next Express object, continues to next middleware.
 */
async function createUser(req, res, next) {
  // TODO: attempt to create uuid, if collision occurs, repeat
  console.log("POST /user", req.body);
  const uuid = uuidv4();
  const newUser = await User.query().insert({ uuid: uuid });
  res.status(201).json({
    user: newUser,
    url: `http://localhost:9090/v1/users/${uuid}`
  });
}

/**
 * @api {put} /users/:uuid Update user's data
 * @apiVersion 0.0.1
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission None
 *
 * @apiParam {String} uuid User's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 204 No content
 *
 * @apiError UserNotFound The <code>uuid</code> of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "UserNotFound"
 *      }
 */

/**
 * This function is the controller for the put route /v1/users/:uuid.
 * Updates user's data in the database and returns no data.
 *
 * @function
 * @async
 *
 * @param {Object} req The incoming request object.
 * @param {Object} req.params Parameters parsed from the address bar.
 * @param {String} req.params.uuid Requested user's uuid.
 * @param {Object} res The outgoing response object.
 * @param {Object} next Express object, continues to next middleware.
 */
async function updateUser(req, res, next) {
  console.log("updateUser");
  console.log(req.params.uuid);
  const numUpdated = await User.query()
    .update({ uuid: req.params.uuid })
    .where("uuid", req.params.uuid);
  if (numUpdated === 1) {
    console.log("successfully updated");
    res.sendStatus(204);
  } else if (numUpdated === 0) {
    throw new UserNotFoundError();
  } else {
    throw new CriticalError("More than one user updated.");
  }
}

/**
 * @api {get} /users Update user's data
 * @apiVersion 0.0.1
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiPermission None
 *
 * @apiSuccess {Object[]}       users       List of User objects
 * @apiSuccess {Object}         user        User object
 * @apiSuccess {String}         user.uuid        User's unique ID.
 * @apiSuccess {Timestamp}      user.created_at  Time user was created.
 * @apiSuccess {Timestamp}      user.updated_at  Time user was updated.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *        {
 *          "uuid": "FILL-IN",
 *          "created_at": "FILL-IN",
 *          "updated_at": "FILL-IN"
 *        }
 *      ]
 */

/**
 * This function is the controller for the get route /v1/users/.
 * Gets all users from the database and returns them as an array.
 *
 * @function
 * @async
 *
 * @param {Object} req The incoming request object.
 * @param {Object} res The outgoing response object.
 * @param {Object} next Express object, continues to next middleware.
 */
async function getAllUsers(req, res, next) {
  console.log("getAllUsers");
  if (req.query.online !== undefined) {
    res.status(200).json({ message: `Handling request to /users?online=true` });
  } else {
    const users = await User.query();
    res.status(200).json(users);
  }
}

/**
 * @api {get} /users/:uuid/devices Get and return user's devices
 * @apiVersion 0.0.1
 * @apiName GetAllDevicesForUser
 * @apiGroup User
 * @apiPermission None
 *
 * @apiParam {String} uuid User's unique ID.
 *
 * @apiSuccess {Object[]}       devices             List of Device objects
 * @apiSuccess {Object}         device              Device object
 * @apiSuccess {String}         device.hash         User's unique ID.
 * @apiSuccess {Timestamp}      device.created_at   Time user was created.
 * @apiSuccess {Timestamp}      device.updated_at   Time user was updated.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *        {
 *          "device": "FILL-IN",
 *        }
 *      ]
 *
 * @apiError UserNotFound The <code>uuid</code> of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "UserNotFound"
 *      }
 */

/**
 * This function is the controller for the get route /v1/users/:uuid/devices.
 * Gets and returns user's devices
 *
 * @function
 * @async
 *
 * @param {Object} req The incoming request object.
 * @param {Object} req.params Parameters parsed from the address bar.
 * @param {String} req.params.uuid Requested user's uuid.
 * @param {Object} res The outgoing response object.
 * @param {Object} next Express object, continues to next middleware.
 */
async function getAllDevicesForUser(req, res, next) {
  const userArray = await User.query()
    .where("uuid", req.params.uuid)
    .eager("devices");
  if (userArray.length === 0) {
    throw new UserNotFoundError();
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

  res.status(200).json(devices);
}

/**
 * @api {delete} /users/:uuid Get and return user's devices
 * @apiVersion 0.0.1
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission None
 *
 * @apiParam {String} uuid User's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 204 OK
 *      {}
 *
 * @apiError UserNotFound The <code>uuid</code> of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "UserNotFound"
 *      }
 */

/**
 * This function is the controller for the delete route /v1/users/:uuid.
 * Delete the user from the database
 *
 * @function
 * @async
 *
 * @param {Object} req The incoming request object.
 * @param {Object} req.params Parameters parsed from the address bar.
 * @param {String} req.params.uuid Requested user's uuid.
 * @param {Object} res The outgoing response object.
 * @param {Object} next Express object, continues to next middleware.
 */
async function deleteUser(req, res, next) {}

module.exports = {
  getUser,
  createUser,
  updateUser,
  getAllUsers,
  getAllDevicesForUser,
  deleteUser
};
