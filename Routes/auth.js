const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../Controllers/authController");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

//Routes for user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.post("/password/reset/:token", resetPassword);
router.get("/myprofile", isAuthenticatedUser, getUserProfile);
router.put("/password/change", isAuthenticatedUser, changePassword);
router.put("/update", isAuthenticatedUser, updateProfile);

//Routes for admin
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getUser
);

router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;
