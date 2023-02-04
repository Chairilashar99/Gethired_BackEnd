const express = require("express");
const userRouter = express.Router();
const { check } = require("express-validator");
const UserModel = require("../models").User;
const validationMiddleware = require("../middleware/ValidationMiddleware");
const { index, detailById, addUser, update, destroy } = require("../controllers/UserController");
const { Router } = require("express");

userRouter.get("/user", index);
userRouter.get("/user/:id", detailById);
userRouter.post("/user", addUser);
userRouter.patch(
  "/user/:id/update",
  check("title").isLength({ min: 1 }).withMessage("Name is required"),
  check("email").isEmail().withMessage("use e-mail").custom((value, {req}) => {
    return UserModel.findOne({ where: { email: value } }).then((user) => {
      if (user) {
        if(req.params.id != user.id) {
          return Promise.reject("Email is alreadey use");
        }
      }
    });
  }),
  validationMiddleware,
  update
);
userRouter.delete("/user/:id/delete", destroy);

module.exports = userRouter;
