const pool = require('./db/db'); 

(async () => {
  try {
    // Running a simple query to test the connection
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected:', result.rows[0]);
    process.exit(0); 
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); 
  }
})();
