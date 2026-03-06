import User from "../Modals/user.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { isAdmin };   

