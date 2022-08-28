const { DateTime } = require('luxon');

// Environment Variables
const PORT = process.env.INVOICE_TRANSFER_PORT || 3000;
const ID = process.env.INVOICE_TRANSFER_ID || undefined;
const KEY = process.env.INVOICE_TRANSFER_KEY || undefined;

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
  PORT,
  KEY,
  ID,
};
