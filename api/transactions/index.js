const router = require("express").Router();
const { Transactions } = require("../../db/Models");
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
  const { q } = req.query;
  if(q) {
    const transaction = await Transactions.findOne({ where:{ id:q } });
    if(!transaction) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ transaction });
  }
  //if they want all transactions that pertain to them
  const { id } = req.user;
  const list = await searchQueryTrans(id); 
  if(list.length === 0) {
    return res.sendStatus(500);
  }
  return res.status(200).json({ list });
  
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