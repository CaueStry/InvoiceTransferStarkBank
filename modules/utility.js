const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, '../util/privateKey.pem'), 'utf8');

// Calculates relative ISO time
// Returns a time relative to the current time in ISO format
function getRelativeISOTime(hOffset, mOffset, sOffset) {
  let date = new Date();
  date.setHours(date.getHours() + hOffset);
  date.setMinutes(date.getMinutes() + mOffset);
  date.setSeconds(date.getSeconds() + sOffset);
  date = `${date.toISOString().slice(0, -1)}+00:00`;
  return date;
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
  getRelativeISOTime,
  getRandomNumber,
  privateKey,
};
