const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const token = req.cookies.spy; // cookie name

  console.log("middlewares/jwtAuth.js : token : ", token);
  try {
    // Verify & decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = {
      id: decoded.id,
      username: decoded.username,
      userType: decoded.userType,
    };

    console.log("Authenticated User:", req.user);
      next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

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

// const jwt = require("jsonwebtoken");

// const jwtAuth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token" });

//   console.log("jwtAuth: ", token)
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // userId, role, etc.
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = jwtAuth;





// module.exports = Contactus;


//   saveMessage: async (req, res) => {
//     const {messageContent} = req.body;
//     console.log(messageContent);
//     console.log