const router = require("express").Router();

router.use("/student", require("./studentRegister"));
router.use("/tutor", require("./tutorRegister"));
router.use("/parent", require("./parentRegister"));

module.exports = router;