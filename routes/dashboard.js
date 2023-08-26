const express = require("express");
const dashboardRoute = express.Router();

const {
  viewDashboardDetails,
  viewDashboardPieDetails,
} = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authProtect");

dashboardRoute.post("/viewDashboardDetails", protect, viewDashboardDetails);
dashboardRoute.post(
  "/viewDashboardPieDetails",
  protect,
  viewDashboardPieDetails
);

module.exports = dashboardRoute;
