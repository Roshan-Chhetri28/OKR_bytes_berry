const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { objectiveSchema, keySchema } = require('../validation/objectiveValidation');


router.get('/list', async (req, res) => {
  try {
    // console.log('Getting objectives');
    
   
    const objectivesResult = await pool.query(`SELECT * FROM "utbl_objectives";`);
    // console.log("Objectives fetched:", objectivesResult.rows);

    
    const keysResult = await pool.query('SELECT * FROM "utbl_keys";');
    console.log("Keys fetched:", keysResult.rows);
    
    if (objectivesResult.rows.length <= 0) {
      return res.status(404).json([]);
    }

    const objectives = objectivesResult.rows.map((obj) => ({
      ...obj,
      keys: keysResult.rows.filter((key) => key.objective_id === obj.objective_id),
    }));
    // console.log("Objectives with keys:", objectives);
    
    res.json(objectives);
  } catch (err) {
    console.error("Error in fetching objectives:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/create', async (req, res) => {
  const { title, description, keys, progress } = req.body;
  console.log("Adding Objective:", req.body);
  if (!title) {
    return res.status(400).json({ error: 'Title and progress are required' });
  }
  
  try {
    
    const objectiveResult = await pool.query(`INSERT INTO utbl_objectives (title, description) VALUES ($1, $2) RETURNING objective_id`, [title, description]);
    const keyResult = await pool.query(`INSERT INTO utbl_keys (objective_id, name, progress) VALUES ($1, $2, $3) RETURNING *`, [objectiveResult.rows[0].objective_id, keys, progress]);

    res.status(201).json(objectiveResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an objective (cascade deletes keys)
router.post('/delete', async (req, res) => {
  const { objective_id } = req.body;
  try {
    await pool.query('DELETE FROM utbl_objectives WHERE objective_id = $1', [objective_id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

router.post('/update', async (req, res) => {
  const { key_id, progress } = req.body;
  try {
    await pool.query('UPDATE utbl_keys SET progress = $1 WHERE key_id = $2', [progress, key_id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});