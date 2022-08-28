const utility = require('../modules/utility');
const authentication = require('../modules/authentication');

// Tests invalid user credentials
test('Should not be valid', () => {
  expect(() => authentication.getUser('invalid', 'invalid', 'invalid')).toThrow(Error);
  expect(() => authentication.getUser('invalid', utility.ID, utility.KEY)).toThrow(Error);
  expect(() => authentication.getUser('sandbox', utility.ID, 'invalid')).toThrow(Error);
});

// Tests valid user credentials
test('Should be valid', () => {
  expect(authentication.getUser('sandbox', utility.ID, utility.KEY).id).toBe(utility.ID);
  expect(authentication.getUser('sandbox', 'Random Project', utility.KEY).id).toBe('Random Project');
});
