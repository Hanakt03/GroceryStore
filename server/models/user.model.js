const { query } = require("express");
const sql = require("./db");

const User = (user) => {
  this.id = user.Id;
  this.username = user.Username;
  this.password = user.Password;
  this.status = user.Status;
  this.idRole = user.ID_Role;
  this.email = user.Email;
  this.phone = user.phone;
  this.address = user.address;
};

User.getAllUsers = (result) => {
  sql.query(
    "SELECT ID, Username, Status, Email, Name FROM `account` WHERE ID <> 1",
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.length > 0) {
        result(res);
        return;
      }
      result(null);
      return;
    }
  );
};
User.paginationUser = (start, itemPerPage, result) => {
  sql.query(
    "SELECT ID, Username, Status, Email, Name FROM `account`  WHERE ID <> 1 ORDER BY ID DESC LIMIT ?, ?",
    [start, itemPerPage],
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.length > 0) {
        result(res);
        return;
      }
      result(null);
      return;
    }
  );
};

//Register
User.createUser = (user, result) => {
  const { username, password, email, phone, address, fullName } = user;
  sql.query(
    "INSERT INTO `account`(`Username`, `Password`, `Status`, `ID_Role`, `Email`, `Name` ,`Phone`, `Address`, `Email_verified_at`) VALUES (?, ?, 1, 1, ?, ?, ?, ?, 'NULL')",
    [username, password, email, fullName, phone, address],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...user });
      result({ id: res.insertId, ...user });
    }
  );
};

//Check if username or email had already been used
User.authenticateAccount = (username, email, result) => {
  sql.query(
    `SELECT Username FROM account WHERE Username = "${username}" OR Email = "${email}"`,
    (err, res) => {
      console.log(res);
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.length > 0) {
        result(res[0]);
        return;
      }
      result(null);
    }
  );
};

//Login
User.findPassword = (username, result) => {
  sql.query(
    `SELECT Password FROM account WHERE Username = "${username}"`,
    (err, res) => {
      console.log(res);
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.length > 0) {
        result(res[0].Password);
        return;
      }
      result(null);
      return;
    }
  );
};

//Get user
User.getUser = (username, result) => {
  sql.query(
    `SELECT ID, Name, Username, Email, Phone, Address, Email_verified_at FROM account WHERE Username = "${username}"`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.length > 0) {
        result(res[0]);
        return;
      }
      result(null);
      return;
    }
  );
};

// Get User by ID
User.getUserByID = (idUser, result) => {
  sql.query(
    `SELECT ID, Name, Username, Email, Phone, Address FROM account WHERE ID = "${idUser}"`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.length > 0) {
        result(res[0]);
        return;
      }
      result(null);
      return;
    }
  );
};

//For reset password by email
User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM account WHERE Email = '${email}'`, (err, res) => {
    if (err) {
      result(err);
      return err;
    }
    if (res.length > 0) {
      result(res[0]);
      return res[0];
    }
    result(null);
  });
};

//Forgot password
User.resetPassword = (email, password, result) => {
  sql.query(
    `UPDATE account SET Password = "${password}" WHERE Email = "${email}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result({ email, password });
    }
  );
};

//Verify email
User.verify = (email, result) => {
  sql.query(
    "UPDATE account SET Email_verified_at = ? WHERE Email = ?",
    [new Date(), email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { email: email });
    }
  );
};

User.updateProfile = (user, result) => {
  const { id, name, phone, address } = user;
  sql.query(
    "UPDATE account SET Name = ?, PHONE = ?, ADDRESS = ? WHERE ID = ?",
    [name, phone, address, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { msg: "Can't update" });
    }
  );
};

User.updateStatus = (id, status, result) => {
  sql.query(
    "UPDATE account SET STATUS = ? WHERE ID = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { msg: "Can't update" });
    }
  );
};

User.deleteUser = (id, result) => {
  sql.query("DELETE FROM `account` WHERE ID = ?", [id], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err);
      return;
    }
    result({ status: "success" });
  });
};

User.getUserByName = (name, result) => {
  let query =
    // name === " "
    //   ? `SELECT * FROM account GROUP BY ID DESC`
    `SELECT * FROM account WHERE Name LIKE "%${name}%" GROUP BY ID DESC`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    if (res.length > 0) {
      result(res);
      return;
    }
    result(null);
    return;
  });
};

module.exports = User;
