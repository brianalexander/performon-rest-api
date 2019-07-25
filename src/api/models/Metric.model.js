const { Model } = require("objection");
const path = require("path");

class Metric extends Model {
  static get tableName() {
    return "metric";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const deviceModelPath = path.join(__dirname, "Device.model");

    return {
      device: {
        relation: Model.BelongsToOneRelation,
        modelClass: deviceModelPath,
        join: {
          from: "metric.device_uuid",
          to: "devices.uuid"
        }
      }
    };
  }
}

module.exports = {
  Metric
};
