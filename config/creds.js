function requireEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return process.env[name];
}

module.exports = {
  walmart: {
    username: requireEnv('WALMART_USERNAME'),
    password: requireEnv('WALMART_PASSWORD'),
  },
};
