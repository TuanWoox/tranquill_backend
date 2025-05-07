const jwt = require("jsonwebtoken");

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};
