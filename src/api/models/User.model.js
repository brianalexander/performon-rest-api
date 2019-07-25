const { Model } = require("objection");
const path = require("path");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const deviceModelPath = path.join(__dirname, "Device.model");

    return {
      devices: {
        relation: Model.HasManyRelation,
        modelClass: deviceModelPath,
        join: {
          from: "users.uuid",
          to: "devices.user_uuid"
        }
      }
    };
  }
}

module.exports = {
  User
};
