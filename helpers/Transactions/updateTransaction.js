const { Transactions } = require("../../db/Models");

async function updateTransaction(id, status, payer) {
  const trans = await Transactions.findOne({ where:{ id:id } });
  if(!trans) {
    throw {
      statusCode: 404,
      message: "transaction id not found"
    };
  }
  trans.status = status;
  trans.payer = payer;
  trans.datePaid = new Date().toISOString();
  await trans.save();
  return trans;
}
module.exports = updateTransaction;