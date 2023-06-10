const transactionRoute = require("./transaction");
const dashboardRoute = require("./dashboard");
const authRoute = require("./auth");
const userRoute = require("./user");
const budgetRoute = require("./budget");

const configRoutes = app => {
  app.use("/dashboard", dashboardRoute);
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/transaction", transactionRoute);
  app.use("/budget", budgetRoute);
};

module.exports = { configRoutes };
