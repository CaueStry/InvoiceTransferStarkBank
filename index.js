const express = require('express');
const https = require('https');
const starkbank = require('starkbank');
const bodyParser = require('body-parser');
const authentication = require('./modules/authentication');
const transactionRoutes = require('./routes/transactionRoutes');
const scheduler = require('./modules/scheduler');
const utility = require('./modules/utility');

const app = express();

// User Authentication
starkbank.user = authentication.getUser('sandbox', utility.ID, utility.KEY);

// JSON Middleware
app.use(bodyParser.json());

// Transaction Routes Middleware
app.use('/', transactionRoutes);

// Creates and starts HTTPS server
const httpsServer = https.createServer({
  key: utility.CERTIFICATE_KEY,
  cert: utility.CERTIFICATE,
}, app);

httpsServer.listen(utility.PORT, () => console.log(`Server listening on port ${utility.PORT}`));

// Schedule Invoices
// Issues 8 to 12 invoices every 3 hours
scheduler.scheduleInvoices();
