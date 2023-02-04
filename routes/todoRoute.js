const express = require("express");
const todoRouter = express.Router();
const { check } = require("express-validator");
const TodoModel = require("../models").Todo;
const validationMiddleware = require("../middleware/ValidationMiddleware");
const { items, detailId, addTodo, update, destroy} = require("../controllers/TodoController");
const { Router } = require("express");

todoRouter.get("/todo", items);
todoRouter.get("/todo/:id", detailId);
todoRouter.post("/todo", addTodo);
todoRouter.patch(
  "/todo/:id/update",
  check("title").isLength({ min: 1 }).withMessage("Name is required").custom((value, {req}) => {
    return TodoModel.findOne({ where: { title: value } }).then((todo) => {
      if (todo) {
        if(req.params.id != todo.id) {
          return Promise.reject("Please enter a different name");
        }
      }
    });
  }),
  validationMiddleware,
  update
);

todoRouter.delete("/todo/:id/delete", destroy);

module.exports = todoRouter;
