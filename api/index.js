const router = require("express").Router();
/**
 * /api/courses
 *    GET     show a list of coursees
 *    POST    submit a new course
 *    PUT     update an existing course
 *    DELETE  remove a course
 * /api/users
 *    GET     retrives a list of users
 *    POST    create a new user
 *    PUT     update an existing user
 *    DELETE  remove a user
 * /api/messages
 *    GET     retrive a list of messages (preferrably one that belongs to requester)
 *    POST    create a new message
 *    DELETE  delete a message (low priority)
 * /api/transactions
 *    GET     retrive a list of transactions
 *    POST    create a new transaction
 *    PUT     update a transaction
 * /api/appointments
 *    GET     retrieve a list of appointments
 *    POST    create a new appointment
 *    PUT     update an appointment
 *    DELETE  delete an appointment
 */
router.use("/courses", require("./courses"));
router.use("/users", require("./users"));
router.use("/transactions", require("./transactions"));

module.exports = router;