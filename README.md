# Invoice Transfer Stark Bank

Uses the Stark Bank SDK and Webhooks to issue invoices to the Sandbox API and transfer funds to the Stark Bank Account.

### Stack

* [Node.JS](https://nodejs.org/) - Server Language
* [Express](https://expressjs.com/) - Webserver Framework
* [Stark Bank SDK](https://starkbank.com/) - Stark Bank SDK
* [Node Cron](https://www.npmjs.com/package/node-cron/) - Task Scheduler
* [Luxon](https://moment.github.io/luxon/) - JS Date and Time Wrapper
* [Jest](https://jestjs.io/) - Testing Framework

### Stark Bank Project Setup

* Create a Stark Bank Sandbox Project and add your private key

* Add a Webhook subscribing to "invoice" and "transfer", and link it to your endpoint URL (Server has to be running on HTTPS mode unless using an HTTPS proxy)

### App Setup

* Make sure you have Node.JS, and NPM Installed.
```sh
    node -v
    npm -v
```

* Install all dependencies 
```sh
    npm install
```


* Setup the environment variables
```sh
    # *REQUIRED* Stark Bank Project ID and Private Key
    export INVOICE_TRANSFER_ID=#YOUR_PROJECT_ID
    export INVOICE_TRANSFER_KEY=#YOUR_PROJECT_PRIVATE_KEY
    # HTTPS Mode (0 for HTTP, 1 FOR HTTPS, 0 is default)
    export ENABLE_HTTPS=#0_or_1
    # HTTP/HTTPS Ports (80 and 443 are default)
    export INVOICE_TRANSFER_HTTP_PORT=#YOUR_HTTP_PORT
    export INVOICE_TRANSFER_HTTPS_PORT=#YOUR_HTTPS_PORT
    # *REQUIRED FOR HTTPS* SSL Certificate and Certificate Key (Self-signed is enough)
    export INVOICE_TRANSFER_CERTIFICATE=#YOUR_SSL_CERTIFICATE
    export INVOICE_TRANSFER_CERTIFICATE_KEY=#YOUR_SSL_CERTIFICATE_KEY
```

* Run the server
```sh
npm start
```

### Testing

* Make sure the app is already setup
* This will issue one invoice and one transfer
```sh
npm run test
```

## Author

* **Caue Pinheiro** - [CaueStry](https://github.com/CaueStry) (cauepnhr@gmail.com)