const { Router } = require("express");
const {
  signup_post,
  login_post,
  logout_get,
  check_auth,
} = require("../controllers/authControllers");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = Router();
router.get("/auth", requireAuth, check_auth);
router.post("/signup", signup_post);
router.post("/login", login_post);
router.get("/logout", logout_get);

module.exports = router;
