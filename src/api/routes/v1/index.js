const express = require("express");

const userRoutes = require("./user.routes");
const deviceRoutes = require("./device.routes");
// const metricRoutes = require("./metric.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/devices", deviceRoutes);
// router.use("/metrics", metricRoutes);

module.exports = router;
