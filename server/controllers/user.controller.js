const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer");
require("dotenv/config");
const getTokenFromHeader = require("../middleware/auth");
const shuffle = require("../middleware/randomString");
const calPagination = require("../middleware/pagination");

const salt = parseInt(process.env.GEN_SALT_HASH);

module.exports = {
  createAccount: (req, res, err) => {
    const { username, password, email, phone, address, fullName } = req.body;
    if (username && password && email) {
      //If this username or email has already been used
      User.authenticateAccount(username, email, (err, user) => {
        if (err || user) {
          res.json({
            status: "failed",
            msg: "This user has already been used!",
          });
        } else {
          //Hashing password and send mail
          const hashedPassword = bcrypt.hashSync(password, salt);
          const newAccount = {
            username,
            password: hashedPassword,
            email,
            phone,
            address,
            fullName,
          };
          User.createUser(newAccount, (data) => {
            const url = `${process.env.APP_URL}/Verify/${email}`;
            console.log(url);
            mailer.sendMail(
              email,
              '"Verify your email from GroCeRy Store"',
              `<a href='${url}'> Verify </a>`
            );
            res.status(200).json({ ...data, status: "success" });
          });
        }
      });
    } else {
      res.status(404).json({ status: "failed", msg: "Fill out the form" });
    }
  },

  verifyEmail: (req, res) => {
    const { email } = req.params;
    console.log(email);
    User.verify(email, (err, result) => {
      if (err) {
        res.json({ status: "failed" });
      } else {
        res.json({ status: "success" });
      }
    });
  },

  login: (req, res, next) => {
    const { username, password } = req.body;

    const user = { username, password };
    User.findPassword(username, (data) => {
      //Compare the hash password with plain password
      if (data !== null) {
        let checkPassword = bcrypt.compareSync(password, data);
        if (checkPassword === true) {
          //Start signing JWT Token
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "3600s",
          });
          res.json({
            status: "success",
            accessToken,
            dateAuth: data.Email_verified_at,
          });
        } else {
          res.json({ status: "failed", msg: "Username or Password wrong" });
        }
      } else {
        res.json({ status: "failed", msg: "This user doesn't exist" });
      }
    });
  },

  authenToken: (req, res, next) => {
    //Browser doesn't have authorization header (need to fetch data in frontend)
    //Getting token from getTokenFromHeader function
    const payload = getTokenFromHeader(req);
    if (!payload) {
      console.log("Not authorized");
      res.status(401).send();
    }
    req.user = { username: payload.username };
    next();
  },

  //Get user's profile information
  getAccount: (req, res) => {
    const { username } = req.user;
    User.getUser(username, (data) => {
      if (data) {
        res.json({ status: "success", user: data });
      } else {
        res.json({ status: "failed", error: "Can't get this user" });
      }
    });
    console.log("first");
  },

  sendResetLinkEmail: (req, res) => {
    const { email } = req.body;
    console.log("Email " + email);
    User.findByEmail(email, (user) => {
      if (!user) {
        res.json({ status: "failed" });
      } else {
        let newEmail = email.replace("@", "x");
        let hashedEmail = shuffle(newEmail);
        const accessToken = jwt.sign(
          req.body,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "3600s",
          }
        );
        mailer.sendMail(
          email,
          '"Reset Password from GroCeRy Store"',
          `<a href='${process.env.APP_URL}/Reset/${email}/${hashedEmail}/'> Reset Password </a>`
        );
        res.json({ status: "success", accessToken });
      }
    });
  },

  reset: (req, res) => {
    const { email, token, password } = req.body;
    const payload = getTokenFromHeader(req);
    if (payload) {
      let newEmail = email.replace("@", "x");
      let hashedEmail = shuffle(newEmail);
      if (token === hashedEmail) {
        const hashedPassword = bcrypt.hashSync(password, salt);
        if (hashedPassword) {
          User.resetPassword(email, hashedPassword, (err, result) => {
            if (err !== null) {
              res.status(200).json({ status: "success" });
            } else {
              res.status(200).json(err);
            }
          });
        }
      } else {
        res.status(404).json({ msg: "Reset isn't successful" });
      }
    }
  },
  //Get get account by id
  getAccountByID: (req, res) => {
    const { idUser } = req.params;
    console.log(idUser);
    User.getUserByID(idUser, (data) => {
      if (data) {
        res.json({ status: "success", user: data });
      } else {
        res.json({ status: "failed", error: "Can't get this idUser" });
      }
    });
    console.log("first");
  },

  updateUserProfile: (req, res) => {
    const updatedUser = req.body;
    User.updateProfile(updatedUser, (data) => {
      if (data) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed", error: "Can't get this idUser" });
      }
    });
  },

  getAllUsers: (req, res, next) => {
    User.getAllUsers((data) => {
      if (data) {
        req.data = data;
        next();
      }
    });
  },
  paginateUsers: (req, res) => {
    const resultsPerPage = 10;
    let data = req.data;
    console.log(data);
    if (data) {
      const numOfResults = data.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.params.page ? Number(req.params.page) : 1;
      const startingLimit = (page - 1) * resultsPerPage;
      User.paginationUser(startingLimit, resultsPerPage, (data) => {
        let { iterator, endingLink } = calPagination(page, numberOfPages, 2, 4);
        if (numOfResults < resultsPerPage) {
          iterator = 1;
          endingLink = 1;
        }
        console.log(data);
        res.json({
          status: "success",
          users: data,
          iterator,
          endingLink,
          page,
          numberOfPages,
        });
      });
    } else {
      res.json({ status: "failed", error: "Can't get this product" });
    }
  },
  updateStatus: (req, res) => {
    const { id, status } = req.body;
    User.updateStatus(id, status, (data) => {
      if (data) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed", error: "Can't get this idUser" });
      }
    });
  },
  deleteUser: (req, res) => {
    const { idUser } = req.params;
    User.deleteUser(idUser, (data) => {
      if (data) {
        res.json({ ...data });
      } else {
        res.json({ status: "fail" });
      }
    });
  },
  findUser: (req, res) => {
    const { name } = req.params;
    User.getUserByName(name, (data) => {
      if (data) {
        res.json({ status: "success", users: data });
      } else {
        res.json({ status: "failed", error: "Can't get this product" });
      }
    });
  },
};
