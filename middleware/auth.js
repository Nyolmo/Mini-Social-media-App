import jwt  from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = decoded.userId;
      next();
    } catch (error) {
      console.log("Auth Middleware Error:", error.message);

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Not Authorized, Token expired!",
        });
      }

      res.status(401).json({
        message: "Token failed, please try again",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token provided",
    });
  }
};
