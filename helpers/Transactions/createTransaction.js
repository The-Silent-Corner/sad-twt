const { Transactions } = require("../../db/Models");
const { TransactionStatus } = require("../../statusConstants");

async function createTransaction(id, amount, appointmentId) {
  const transaction = await Transactions.findOne({ where:{ id:id } });
  if(transaction) {
    throw {
      statusCode: 409,
      message: "transaction already exists"
    };
  }
  try{
    await Transactions.create({
      id: id,
      status: TransactionStatus.NotPaid,
      amount: amount,
      appointmentId: appointmentId
    });
  } catch(err) {
    throw {
      statusCode: 500,
      message: "orm tool failed"
    };
  }
  return true;
}
module.exports = createTransaction;