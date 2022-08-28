const { DateTime } = require('luxon');

// Environment Variables
const HTTP_PORT = process.env.INVOICE_TRANSFER_HTTP_PORT || 80;
const HTTPS_PORT = process.env.INVOICE_TRANSFER_HTTPS_PORT || 443;
const ID = process.env.INVOICE_TRANSFER_ID || undefined;
const KEY = process.env.INVOICE_TRANSFER_KEY || undefined;
const CERTIFICATE = process.env.INVOICE_TRANSFER_CERTIFICATE || undefined;
const CERTIFICATE_KEY = process.env.INVOICE_TRANSFER_CERTIFICATE_KEY || undefined;
const HTTPS = parseInt(process.env.ENABLE_HTTPS, 10) || 0;

// Converts the "Z" at the end of an ISO date time to "+00:00"
// Returns the given date and time ending "+00:00" instead of "Z"
function convertUTCFormat(dt) {
  return `${dt.slice(0, -1)}+00:00`;
}

// Calculates current ISO date and time
// Returns current date and time in ISO format
function getISOTime() {
  const dt = DateTime.now().setZone('utc');
  return convertUTCFormat(dt.toISO());
}

// Calculates relative ISO date and time
// Returns a date and time relative to the current time in ISO format
function getRelativeISOTime(hOffset, mOffset, sOffset) {
  const dt = DateTime.now().setZone('utc').plus({ hours: hOffset, minutes: mOffset, seconds: sOffset });
  return convertUTCFormat(dt.toISO());
}

// Generates a random number
// Returns a random number in a range
function getRandomNumber(min, max) {
  if (min > max) {
    throw new Error('Min value is larger than max value');
  }
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  getISOTime,
  getRelativeISOTime,
  getRandomNumber,
  convertUTCFormat,
  HTTP_PORT,
  HTTPS_PORT,
  KEY,
  ID,
  CERTIFICATE_KEY,
  CERTIFICATE,
  HTTPS,
};
