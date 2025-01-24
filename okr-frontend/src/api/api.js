import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/objectives',
});

// Fetch all objectives
export const getObjectives = async () => {
  const obj = await api.get('/list');
  console.log(obj);
  return obj.data;
};

// Add a new objective
export const addObjective = async (objective) => {
  return api.post('/create', objective);
};

// Update key progress
export const updateKeyProgress = async (keyId, progress) => {
  return api.post('/update', { key_id: keyId, progress });
};

// Delete an objective
export const deleteObjective = async (objectiveId) => {
  return api.post('/delete', { objective_id: objectiveId });
};
