
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const parent = require('./routes/parent')
const register = require('./routes/register')
const student = require('./routes/student')
const present = require('./routes/present')

dotenv.config();
const uri = process.env.URI;
const port = process.env.PORT || 8002;
const app = express();
app.use(express.json());

app.use(cors({
  origin:[
    'http://localhost:3000'
  ]
}));

app.get("/", (req, res) => {
  res.send("connected successfully");
});

app.use('/parent',parent)
app.use('/register',register)
app.use('/student',student)
app.use('/present',present)

app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    if (err instanceof multer.MulterError) {
   
      res.status(500).send("There was an upload error!");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});


mongoose
  .connect(uri)
  .then(() => console.log("DB is connected now"))
  .catch((err) => console.log("Not Connected", err));

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});