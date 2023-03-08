module.exports = {
  // environment variables imported from .env file
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY,
  pg_username: process.env.pg_username,
  pg_password: process.env.pg_password,
  pg_database: process.env.pg_database,
  pg_host: process.env.pg_host,
  pg_port: process.env.pg_port,
};
