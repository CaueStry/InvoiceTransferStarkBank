const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const transaction = require('./transaction');
// const utility = require('./utility');

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../util/users.json'), 'utf8'));

// Schedules random invoices
// Creates 8 to 12 invoices every 3 hours
// async function scheduleInvoices() {
//   cron.schedule('0 */3 * * *', () => {
//     const randomUsers = users.sort(() => 0.5 - Math.random())
//       .slice(0, utility.getRandomNumber(8, 12));
//     transaction.sendRandomInvoices(randomUsers);
//   });
// }
async function scheduleInvoices() {
  cron.schedule('*/4 * * * *', () => {
    const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 1);
    transaction.sendRandomInvoices(randomUsers);
  });
}

module.exports = {
  scheduleInvoices,
};
