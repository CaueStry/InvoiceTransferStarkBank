const starkbank = require('starkbank');

// Authenticates and retrieves user
// Returns user information
function getUser(env, id, key) {
  return new starkbank.Project({
    environment: env,
    id,
    privateKey: key,
  });
}

module.exports = {
  getUser,
};
