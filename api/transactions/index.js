const router = require("express").Router();
const { Transactions } = require("../../db/Models");
const createTransaction = require("../../helpers/Transactions/createTransaction");
const loginMiddleware = require("../../middleware/checkLoggedIn");
const { TransactionStatus } = require("../../statusConstants");

router.post("/", loginMiddleware, async(req, res) =>{
  const { id, amount, appointmentId } = req.body;
  if(!id || !amount ||  !appointmentId) {
    return res.sendStatus(400);
  }
  await createTransaction(id, TransactionStatus.NotPaid, amount, new Date().toISOString(), appointmentId);
  res.end();
});

router.get("/", loginMiddleware, async(res, req) =>{
  const { id } = req.body;
  if(!id) {
    return res.sendStatus(400);
  }
  const trans = await Transactions.findAll({ where:{ id:id } });
  res.json({ trans: trans });
  res.end();
});
module.exports = router;