const { Transactions } = require("../../db/Models");

async function updateTransaction(id, status, payer) {
  const trans = await Transactions.findOne({ where:{ id:id } });
  if(!trans) {
    return false;
  }
  trans.status = status;
  trans.payer = payer;
  trans.datePaid = new Date().toISOString();
  trans.save();
  return trans;
}
module.exports = updateTransaction;