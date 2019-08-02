function exceptionHandler(fn) {
  return function(req, res, next) {
    fn(req, res).catch(function(err) {
      next(err);
    });
  };
}

class UserNotFoundError extends Error {
  constructor(...args) {
    super(...args);
    this.statusCode = 404;
    this.message = "User not found.";
    Error.captureStackTrace(this, UserNotFoundError);
  }
}

class DeviceNotFoundError extends Error {
  constructor(...args) {
    super(...args);
    this.statusCode = 404;
    this.message = "Device not found.";
    Error.captureStackTrace(this, DeviceNotFoundError);
  }
}

module.exports = { UserNotFoundError, DeviceNotFoundError, exceptionHandler };
