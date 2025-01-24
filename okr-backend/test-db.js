const pool = require('./db/db'); // Make sure the path is correct to your db.js file

(async () => {
  try {
    // Running a simple query to test the connection
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected:', result.rows[0]);
    process.exit(0); // Exit with success code (0) if the query succeeds
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit with error code (1) if an error occurs
  }
})();
