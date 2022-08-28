const express = require('express');
const transaction = require('../modules/transaction');

const router = express.Router();

// Logging Middleware
// Logs on the terminal every request received to the root endpoint
// Returns a 400 status if request is invalid
router.post('/', (req, res, next) => {
  try {
    if (req.body.event.subscription === 'invoice') {
      console.log(`Invoice ${req.body.event.log.invoice.id}\n  - Status: ${req.body.event.log.type}\n  - Time: ${new Date()}`);
    } else if (req.body.event.subscription === 'transfer') {
      console.log(`Transfer ${req.body.event.log.transfer.id}\n  - Status: ${req.body.event.log.type}\n  - Time: ${new Date()}`);
    } else {
      console.log('Unknown Request Received');
    }
    next();
  } catch (err) {
    console.log('Invalid Request Received');
    res.status(400).json({ message: 'Invalid request' });
  }
});

// Webhook Handler Route
// Transfers credited invoice amounts to the Stark Bank account
// Returns a 200 status if request is valid
// Returns a 400 status if request is invalid
router.post('/', async (req, res) => {
  try {
    if (req.body.event.subscription === 'invoice' && req.body.event.log.type === 'credited') {
      await transaction.sendStarkBankTransfer(
        req.body.event.log.invoice.amount,
        req.body.event.log.invoice.id,
      );
    }
    res.status(200).send();
  } catch (err) {
    console.log('Invalid request received');
    res.status(400).json({ message: 'Invalid request' });
  }
});

module.exports = router;
