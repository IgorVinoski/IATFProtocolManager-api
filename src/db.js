const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_LzVOb79tlmQR@ep-rapid-voice-ac6uplh8-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require',
});

module.exports = pool;
