


const jwt = require("jsonwebtoken");
const dataGuard = async (req, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, role } = decoded;
    if (role=='admin' || role=='chief') {
      next();
    } else {
      next("Authentication Error");
    }
  } catch (error) {
    next("Authentication Error");
  }
};

module.exports = dataGuard;