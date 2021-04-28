const router = require("express").Router();
router.use("/", require("./update"));
router.use("/addCourse", require("./addCourse"));
module.exports = router;