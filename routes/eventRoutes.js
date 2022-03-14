const { Router } = require("express");
const { events_get, event_post } = require("../controllers/eventControllers");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = Router();

router.get("/getevent", requireAuth, events_get);
router.post("/createevent", requireAuth, event_post);

module.exports = router;
