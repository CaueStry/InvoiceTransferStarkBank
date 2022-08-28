const { DateTime } = require('luxon');
const utility = require('../modules/utility');

// Tests valid random numbers
test('Should be a valid number', () => {
  expect(utility.getRandomNumber(0, 0)).toBe(0);
  expect(utility.getRandomNumber(100, 1000)).toBeGreaterThanOrEqual(100);
  expect(utility.getRandomNumber(100, 1000)).toBeLessThanOrEqual(1000);
  expect(utility.getRandomNumber(-1000, -100)).toBeGreaterThanOrEqual(-1000);
  expect(utility.getRandomNumber(-1000, -100)).toBeLessThanOrEqual(-100);
});

// Tests invalid random numbers
test('Should be an invalid number', () => {
  expect(() => utility.getRandomNumber(1000, 100)).toThrow(Error);
  expect(() => utility.getRandomNumber(-100, -1000)).toThrow(Error);
  expect(() => utility.getRandomNumber(0, -1)).toThrow(Error);
});

// Tests UTC format conversion
test('Should return ISO ending in +00:00 instead of Z', () => {
  expect(utility.convertUTCFormat('2022-08-28T03:50:51.124Z')).toBe('2022-08-28T03:50:51.124+00:00');
});

// Tests current date
test('Should be the current date and time', () => {
  let today = utility.getRelativeISOTime(0, 0, 0);
  today = today.slice(0, 16);
  let expectedToday = DateTime.now().setZone('utc').toISO();
  expectedToday = expectedToday.slice(0, 16);
  expect(today).toBe(expectedToday);
});

// Tests relative date in the future
test('Should be a day in the future', () => {
  let tomorrow = utility.getRelativeISOTime(24, 0, 0);
  tomorrow = tomorrow.slice(0, 16);
  let expectedTomorrow = DateTime.now().setZone('utc');
  expectedTomorrow = expectedTomorrow.plus({ hours: 24 }).toISO().slice(0, 16);
  expect(tomorrow).toBe(expectedTomorrow);
});

// Tests relative date in the past
test('Should be a day in the past', () => {
  let yesterday = utility.getRelativeISOTime(-24, 0, 0);
  yesterday = yesterday.slice(0, 16);
  let expectedYesterday = DateTime.now().setZone('utc');
  expectedYesterday = expectedYesterday.minus({ hours: 24 }).toISO().slice(0, 16);
  expect(yesterday).toBe(expectedYesterday);
});
