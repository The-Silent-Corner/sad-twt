const router = require("express").Router();

router.use("/courses", require("./courses"));
router.use("/users", require("./users"));
router.use("/transactions", require("./transactions"));
router.use("/appointments", require("./appointments"));
router.use("/messages", require("./messages"));
module.exports = router;