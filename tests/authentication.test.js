const utility = require('../modules/utility');
const authentication = require('../modules/authentication');

// Tests invalid user credentials
test('Should not be valid', () => {
  expect(() => authentication.getUser('invalid', 'invalid', 'invalid')).toThrow(Error);
  expect(() => authentication.getUser('invalid', '5592373472002048', utility.KEY)).toThrow(Error);
  expect(() => authentication.getUser('sandbox', '5592373472002048', 'invalid')).toThrow(Error);
});

// Tests valid user credentials
test('Should be valid', () => {
  expect(authentication.getUser('sandbox', '5592373472002048', utility.KEY).id).toBe('5592373472002048');
  expect(authentication.getUser('sandbox', 'Random Project', utility.KEY).id).toBe('Random Project');
});
