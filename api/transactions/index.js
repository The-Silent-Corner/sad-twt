const router = require("express").Router();
const createTransaction = require("../../helpers/Transactions/createTransaction");
const loginMiddleware = require("../../middleware/checkLoggedIn");

router.post("/", loginMiddleware, async(req, res) =>{
  const { id, payer, status, amount, datePaid, appointmentId } = req.body;
  if(!id || !payer || !status || !amount || !datePaid || !appointmentId) {
    return res.sendStatus(400);
  }
  await createTransaction(id, payer, status, amount, datePaid, appointmentId);
  res.end();
});
module.exports = router;