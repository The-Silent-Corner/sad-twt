const router = require("express").Router();
const { Transactions, Appointments } = require("../../db/Models");
const createTransaction = require("../../helpers/Transactions/createTransaction");
const loginMiddleware = require("../../middleware/checkLoggedIn");
const searchQueryTrans = require("../../helpers/Transactions/searchQueryTrans");
const updateTransaction = require("../../helpers/Transactions/updateTransaction");

router.post("/", loginMiddleware, async(req, res) =>{
  const { id, amount, appointmentId } = req.body;
  if(!id || !amount || !appointmentId) {
    return res.sendStatus(400);
  }
  await createTransaction(id, amount, appointmentId);
  res.end();
});

router.get("/", loginMiddleware, async(req, res) =>{
  // If they want a specific transaction, do this
  const { id: q } = req.query;
  if(q) {
    const transaction = await Transactions.findOne({ where:{ id:q } });
    if(!transaction) {
      return res.status(500).json({ message: `unable to find appointment id for transaction ${aptId}` });
    }
    return res.status(200).json({ transaction });
  }
  const { id } = req.user;
  const appList = await searchQueryTrans(id);  
  const transaction = await Transactions.findAll({
    where: {
      appointmentId: appList.id
    }
  });
  const app = await Appointments.findAll({
    where:{
      id: transaction.appointmentId,
      studentId:q
    }
  });
  res.end();
});
router.put("/", loginMiddleware, async(req, res)=>{
  const { id, status, payer } = req.body;
  if(!id || !status || !payer) {
    return res.sendStatus(400);
  }
  const trans = await updateTransaction(id, status, payer);
  if(!trans) {
    return res.sendStatus(500);
  }
  return res.status(200).json({ trans });
});
module.exports = router;