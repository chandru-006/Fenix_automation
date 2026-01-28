function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

module.exports = {
  walmart: {
    username: requireEnv('WALMART_USERNAME'),
    password: requireEnv('WALMART_PASSWORD'),
  },
};
