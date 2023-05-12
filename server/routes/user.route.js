const User = require("../controllers/user.controller");

const router = require("express").Router();

module.exports = (app) => {
  router.get(
    "/api/admin/users/page/:page",
    User.getAllUsers,
    User.paginateUsers
  );
  router.get("/api/verify/:email", User.verifyEmail);
  router.get("/api/profile/:idUser", User.getAccountByID);
  router.get("/api/admin/user/search/:name", User.findUser);

  router.post("/api/register", User.createAccount);
  router.post("/api/login", User.login);
  router.post("/api/user", User.authenToken, User.getAccount);
  router.post("/api/email", User.sendResetLinkEmail);
  router.put("/api/reset", User.reset);

  router.put("/api/profile/update", User.updateUserProfile);
  router.put("/api/admin/user/status", User.updateStatus);
  router.delete("/api/admin/user/delete/:idUser", User.deleteUser);

  app.use(router);
};
