const express = require('express');
const app = express();
const {sequelize} = require('./models')
const router = require("./routes/userRoute");
const router1 = require("./routes/todoRoute")
const port = 3030;

app.use(express.json())
app.use(router);
app.use(router1)
app.listen(port, async function() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return console.log(`server berjalan di port ${port}`);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});

