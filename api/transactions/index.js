const router = require("express").Router();
const { transaction } = require("../../db");
const { Transactions } = require("../../db/Models");
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

router.get("/", loginMiddleware, async(res,req) =>{
  const { id } = req.body;
  if(!id){
    return res.sendStatus(400);
  }
  const trans = await Transactions.findAll({where:{id:id}})
  res.json({trans: trans})
  res.end();
});
module.exports = router;