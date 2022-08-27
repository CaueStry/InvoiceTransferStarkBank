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

// Tests current date
test('Should be the current date and time', () => {
  let today = utility.getRelativeISOTime(0, 0, 0);
  today = today.slice(0, 13);
  expect(today).toBe(new Date().toISOString().slice(0, 13));
});

// Tests relative date in the future
test('Should be a day in the future', () => {
  let tomorrow = utility.getRelativeISOTime(24, 0, 0);
  tomorrow = tomorrow.slice(8, 10);
  let expectedTomorrow = new Date().getDate() + 1;
  expectedTomorrow = expectedTomorrow.toString();
  expect(tomorrow).toBe(expectedTomorrow);
});

// Tests relative date in the past
test('Should be a day in the past', () => {
  let tomorrow = utility.getRelativeISOTime(-24, 0, 0);
  tomorrow = tomorrow.slice(8, 10);
  let expectedTomorrow = new Date().getDate() - 1;
  expectedTomorrow = expectedTomorrow.toString();
  expect(tomorrow).toBe(expectedTomorrow);
});
