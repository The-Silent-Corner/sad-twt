const router = require("express").Router();
const { Transactions } = require("../../db/Models");
const createTransaction = require("../../helpers/Transactions/createTransaction");
const loginMiddleware = require("../../middleware/checkLoggedIn");
const searchQueryTrans = require("../../helpers/Transactions/searchQueryTrans");
const updateTransaction = require("../../helpers/Transactions/updateTransaction");
const { v4 } = require("uuid");

router.post("/", loginMiddleware, async(req, res) =>{
  const id = v4();
  const { amount, appointmentId } = req.body;
  if(!amount || !appointmentId) {
    return res.sendStatus(400);
  }
  try {
    await createTransaction(id, amount, appointmentId);
  } catch(err) {
    res.status(err.status).json({ message: err.message });
  }
  res.status(201).end();
});

router.get("/", loginMiddleware, async(req, res) =>{
  const { q } = req.query;
  if(q) {
    const transaction = await Transactions.findOne({ where:{ id:q } });
    if(!transaction) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ transaction });
  }
  const { id } = req.user;
  try
  {
    const list = await searchQueryTrans(id); 
    return res.status(200).json({ list });
  }catch(err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
});
router.put("/", loginMiddleware, async(req, res)=>{
  const { id, status, payer } = req.body;
  if(!id || !status || !payer) {
    return res.sendStatus(400);
  }
  try {
    await updateTransaction(id, status, payer);
    return res.sendStatus(204);
  } catch(err) {
    res.status(err.statusCode).json({ message: err.message });
  }
});
module.exports = router;