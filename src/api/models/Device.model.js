const { Model } = require("objection");
const path = require("path");

class Device extends Model {
  static get tableName() {
    return "devices";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const userModelPath = path.join(__dirname, "User.model");
    const metricModelPath = path.join(__dirname, "Metric.model");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: userModelPath,
        join: {
          from: "devices.userUUID",
          to: "users.UUID"
        }
      },
      metrics: {
        relation: Model.HasManyRelation,
        modelClass: metricModelPath,
        join: {
          from: "devices.uuid",
          to: "metrics.device_uuid"
        }
      }
    };
  }
}

module.exports = {
  Device
};
