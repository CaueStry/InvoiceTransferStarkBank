const starkbank = require('starkbank');
const utility = require('./utility');

// Issues invoices
// Returns created invoices
async function issueInvoices(invoices) {
  console.log(`Issuing ${invoices.length} Invoice(s)`);
  return starkbank.invoice.create(invoices);
}

// Issues random invoices
// Returns created invoices
async function sendRandomInvoices(users) {
  const invoices = [];
  users.forEach((user) => {
    invoices.push({
      name: user.name,
      taxId: user.taxId,
      amount: utility.getRandomNumber(1, 1000),
      due: utility.getRelativeISOTime(1, 0, 0),
      expiration: 3600,
      tags: ['Scion'],
    });
  });
  return issueInvoices(invoices);
}

// Sends a transfer
// Returns the created transfer
async function issueTransfers(transfers) {
  console.log(`Issuing ${transfers.length} Transfer(s)`);
  return starkbank.transfer.create(transfers);
}

// Sends a transfer to Stark Bank S.A.
// Returns the created transfer
async function sendStarkBankTransfer(amount, id) {
  return issueTransfers([
    {
      amount,
      name: 'Stark Bank S.A.',
      taxId: '20.018.183/0001-80',
      bankCode: '20018183',
      branchCode: '0001',
      accountNumber: '6341320293482496',
      accountType: 'payment',
      externalId: `invoice-${id}`,
      tags: ['invoice-transfer', `invoice-${id}`],
    },
  ]);
}

module.exports = {
  issueInvoices,
  sendRandomInvoices,
  issueTransfers,
  sendStarkBankTransfer,
};
