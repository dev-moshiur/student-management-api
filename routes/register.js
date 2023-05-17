



const router = require("express").Router();
const User = require("../models/Admin");
const verify = require("../middleweres/verify");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//REGISTER
router.get("/",async (req, res) => {
  try {
    //generate new password
    

    const userNow = await User.find()
    res.status(200).json(userNow);
 }
  catch (err) {
    res.status(500).json(err);
  }
});
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const userNow = await User.find({email :req.body.email})
    

   if (userNow.length>0) {
    res.status(400).json('You are already a user')
    
   } else {
    
  
    const user = await newUser.save();
    res.status(200).json(user);
 }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log('reached')
    console.log(req.body,'fgfh')
    const user = await User.findOne({ email: req.body.email });
    console.log('first')
    if (!user) {
      console.log('not user')
      res.status(404).json("user not found");
      
    } else {
      console.log('user')
      
    
    

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (validPassword) {
      //genarate token

      const token = await jwt.sign(
        {
          name: user.name,

          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "6h",
        }
      );
    
        res
          .cookie("token", token, {
            secure: true,
            httpOnly:true,
          }).status(200)
          .send("Cookie have been saved successfully");
     
    } else {
      res.status(400).json("wrong password");
    }
  }

    //res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;