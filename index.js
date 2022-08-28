const express = require('express');
const https = require('https');
const http = require('http');
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

// Creates and starts HTTP/HTTPS server
let server;
let port;
if (utility.HTTPS) {
  server = https.createServer({
    key: utility.CERTIFICATE_KEY,
    cert: utility.CERTIFICATE,
  }, app);
  port = utility.HTTPS_PORT;
} else {
  server = http.createServer(app);
  port = utility.HTTP_PORT;
}

server.listen(port, () => console.log(`Server listening on port ${port}`));

// Schedule Invoices
// Issues 8 to 12 invoices every 3 hours
scheduler.scheduleInvoices();
