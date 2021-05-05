const { Transactions } = require("../../db/Models");

async function createTransaction(id, payer, status, amount, datePaid, appointmentId) {
  const transaction = await Transactions.findOne({ where:{ id:id } });
  if(transaction) {
    return false;
  }
  try{
    await Transactions.create({
      id: id,
      payer: payer,
      status: status,
      amount: amount,
      datePaid: datePaid,
      appointmentId: appointmentId
    });
  }catch(err)
  {
    return false;
  }
  return true;
}
module.exports = createTransaction;