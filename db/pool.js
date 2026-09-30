const { Pool } = require("pg");

// In production (e.g. Render) set DATABASE_URL; locally the settings below are used.
module.exports = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : new Pool({
      host: "localhost",
      user: "nithin",
      database: "inventory",
      password: "999500",
      port: 5432
    });
