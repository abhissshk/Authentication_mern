const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "user is not authenticated" });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message); // 👈 debug

    return res.status(401).json({   // ✅ FIXED
      message: "invalid or expired token"
    });
  }
};

module.exports = checkAuth;