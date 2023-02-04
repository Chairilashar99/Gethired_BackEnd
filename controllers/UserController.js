const UserModel = require("../models").User;

async function index(req, res) {

  try {
    const users = await UserModel.findAll()
    return res.json({
      status: "Success",
      message: "Success",
      data: users
    })
  } catch (err) {
    console.log(err)
  }
}

async function detailById (req, res) {
  let id = req.params.id;
  try {
    const user = await UserModel.findByPk(id);
    if(user === null) return res.status(404).json({
      status: "Not Found",
      message: "User not found"
    })
    return res.json({
      status: "Success",
      message: "Success",
      data: user
    })
  } catch (err) {
    console.log(err)
  }
}

async function addUser (req,res) {
  const payload = req.body;

  try {
    const user = await UserModel.create(payload);
    return res.status(201).json({
      status: "Success",
      message: "Success",
      data: user
    })
  } catch (err) {
    console.log(err)
  }
}

async function update(req, res) {
  try {
    const payload = req.body
    const {id} = req.params
    let {title, email} = req.body
    
    // const updateUser = await UserModel.update(payload, {
    //   where : {
    //     id : id
    //   }
    // })

    const updateUser = await UserModel.update({
      title: title,
      
    }, {
      where : {
        id : id
      }
    })

    if(updateUser[0] === 0) return res.status(422).json({
      status: "Not found",
      message: "User not found"
    })
    return res.json({
      status: "Success",
      message: "Success"
    })
    
  } catch (err) {
    console.log(err)
  }
}

async function destroy(req, res) {
  const {id} = req.params;

  const deleteUser = await UserModel.destroy({
    where : {
      id: id
    }
  })

  if(!deleteUser) return res.json({
    status: "Not found",
    message: "User not found"
  });

  return res.json({
    status: "Success",
    message: "Success"
  });
}

module.exports = { index, detailById, addUser, update, destroy };
