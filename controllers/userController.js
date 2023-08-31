const { getDbConnection, closeDbConnection } = require("../config/dbconfig");
const util = require("util");
const {
  INTERNAL_SERVER_ERROR,
  // USER_UPDATED_SUCCESS,
  USER_NOT_EXISTS,
} = require("../messages/responseMessages");
const {
  // checkIfUserExistsByUsernameOrEmail,
  fetchUserDetailsByUserId,
  updateUserAvatarDetails,
  updateUserPasswordDetails,
  // updateUserDetails,
} = require("../repository/userRepository");
const bcrypt = require("bcryptjs");

exports.viewUserDetails = async (req, res) => {
  try {
    let user = req.user;
    let connection = await getDbConnection();
    let connectionPromise = util.promisify(connection.query).bind(connection);
    fetchUserDetailsByUserId(connectionPromise, user)
      .then(async UserRows => {
        if (UserRows.length > 0) {
          res.status(200).json({ status: "SUCCESS", data: UserRows });
        } else {
          res.status(200).json({ status: "NOT FOUND", data: [] });
        }
      })
      .catch(err => {
        res.status(500).json({
          status: "FAILURE",
          error: [{ msg: err.message || INTERNAL_SERVER_ERROR }],
        });
      });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "FAILURE",
      error: [{ msg: INTERNAL_SERVER_ERROR }],
    });
  }
};

exports.updateUserAvatar = async (req, res) => {
  let connection;
  try {
    connection = await getDbConnection();
    let user = req.user;
    user = { ...user, ...req.body };
    let connectionPromise = util.promisify(connection.query).bind(connection);
    let result = await updateUserAvatarDetails(connectionPromise, user);
    // check if user exists in the database, yes - update user, no - return error
    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ status: "SUCCESS", msg: "User Avatar Updated Successfully!" });
    } else {
      res.status(400).json({
        status: "FAILURE",
        error: { name: user.name, msg: USER_NOT_EXISTS },
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "FAILURE",
      error: { msg: INTERNAL_SERVER_ERROR },
    });
  } finally {
    await closeDbConnection(connection);
  }
};

exports.updateUserPassword = async (req, res) => {
  let connection;
  try {
    connection = await getDbConnection();
    let user = req.user;
    let password = req.body.newpassword;
    let hashPass = await bcrypt.hash(password, 10);
    user = { ...user, password: hashPass };
    let connectionPromise = util.promisify(connection.query).bind(connection);
    let result = await updateUserPasswordDetails(connectionPromise, user);
    // check if user exists in the database, yes - update user, no - return error
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "SUCCESS",
        msg: "User Password Updated Successfully!",
      });
    } else {
      res.status(400).json({
        status: "FAILURE",
        error: { name: user.name, msg: USER_NOT_EXISTS },
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "FAILURE",
      error: { msg: INTERNAL_SERVER_ERROR },
    });
  } finally {
    await closeDbConnection(connection);
  }
};
