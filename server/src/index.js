const express = require('express');
const dotev = require('dotenv');
const cookieParser = require('cookie-parser');
dotev.config();
const cors = require('cors');
const db = require('./models');
const routes = require('./routes/index');


const app = express();


app.use(cors(
  {
    origin: true,
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

routes(app)

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, async () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`)
  });
});
