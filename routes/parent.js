
const router = require("express").Router();
const User = require("../models/Admin");
const verify = require("../middleweres/verify");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");




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