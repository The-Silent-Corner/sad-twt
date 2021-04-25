const router = require("express").Router();

router.use("/student", require("./studentLogin"));
router.use("/parent", require("./parentLogin"));
router.use("/tutor", require("./tutorLogin"));

module.exports = router;