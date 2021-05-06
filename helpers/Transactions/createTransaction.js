const { Transactions } = require("../../db/Models");
const { TransactionStatus } = require("../../statusConstants");

async function createTransaction(id, amount, appointmentId) {
  const transaction = await Transactions.findOne({ where:{ id:id } });
  if(transaction) {
    return false;
  }
  try{
    await Transactions.create({
      id: id,
      status: TransactionStatus.NotPaid,
      amount: amount,
      datePaid: new Date().toISOString(),
      appointmentId: appointmentId
    });
  }catch(err)
  {
    return false;
  }
  return true;
}
module.exports = createTransaction;