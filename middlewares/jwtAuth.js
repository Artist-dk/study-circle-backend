const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const token = req.cookies.spy; // cookie name

  console.log("middlewares/jwtAuth.js : token : ", token);

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
};

module.exports = jwtAuth;
