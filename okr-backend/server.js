const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const objectiveRoutes = require('./routes/objective');
app.use('/objectives', objectiveRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
