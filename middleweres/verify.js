

const jwt = require("jsonwebtoken");
const verify = async (req,res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    if (email == req.body.email) {
        console.log('match')
      next();
    } else {
        console.log('dont match')
      next("Email verification failed");
    }
  } catch (error) {
    next("Email verification failed");
  }
};

module.exports = verify;