const TodoModel = require("../models").Todo;

async function items(req, res) {
  try {
    const todo = await TodoModel.findAll();
    return res.json({
      status: "Success",
      message: "Success",
      data: todo,
    });
  } catch (err) {
    console.log(err);
  }
}

async function detailId(req, res) {
  let id = req.params.id;
  try {
    const todo = await TodoModel.findByPk(id);
    if (todo === null)
      return res.status(404).json({
        status: "Not Found",
        message: "User not found",
      });
    return res.json({
      status: "Success",
      message: "Success",
      data: todo,
    });
  } catch (err) {
    console.log(err);
  }
}

async function addTodo(req, res) {
  const payload = req.body;

  try {
    const todo = await TodoModel.create(payload);
    return res.status(201).json({
      status: "Success",
      message: "Success",
      data: todo,
    });
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  try {
    const payload = req.body;
    const { id } = req.params;
    let { title, is_active, priority } = req.body;

    const updateTodo = await TodoModel.update(
      {
        title: title,
        is_active: is_active,
        priority: priority,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (updateTodo[0] === 0)
      return res.status(422).json({
        status: "Not found",
        message: "Todo not found",
      });
    return res.json({
      status: "Success",
      message: "Success",
    });
  } catch (err) {
    console.log(err);
  }
}

async function destroy(req, res) {
  const { id } = req.params;

  const deleteTodo = await TodoModel.destroy({
    where: {
      id: id,
    },
  });

  if (!deleteTodo)
    return res.json({
      status: "Not found",
      message: "User not found",
    });

  return res.json({
    status: "Success",
    message: "Success",
  });
}

module.exports = { items, detailId, addTodo, update, destroy };
