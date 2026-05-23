const { Pool } = require("pg");

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("DB ERROR:", err);
  });

module.exports = pool;