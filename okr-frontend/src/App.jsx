import React, { useState, useEffect } from 'react';
import Navbar from './components/shared/Navbar';
import ObjectiveForm from './components/forms/ObjectiveForm';
import ObjectiveList from './components/lists/ObjectiveList';
import ProgressPage from './components/progress/ProgressPage';
import { getObjectives, addObjective, updateKeyProgress, deleteObjective } from './api/api';

const App = () => {
  const [objectives, setObjectives] = useState([]);
  const [showProgressPage, setShowProgressPage] = useState(false);

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const response = await getObjectives();
        // console.log('Objectives fetched:', response);
        setObjectives(response);
      } catch (error) {
        console.error('Error fetching objectives:', error);
      }
    };
    fetchObjectives();
  }, []);

  const handleAddObjective = async (objective) => {
    try {
      console.log("Adding Objective:", objective); // Log the data being sent
      const response = await addObjective(objective);
      console.log('Objective added:', response.data);
      setObjectives([response.data, ...objectives]);
    } catch (error) {
      console.error('Error adding objective:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteObjective = async (objectiveId) => {
    try {
      await deleteObjective(objectiveId);
      setObjectives(objectives.filter((obj) => obj.objective_id !== objectiveId));
    } catch (error) {
      console.error('Error deleting objective:', error);
    }
  };

  const handleUpdateKeyProgress = async (keyId, progress) => {
    try {
      await updateKeyProgress(keyId, progress);
      const updatedObjectives = objectives.map((obj) => {
        obj.keys = obj.keys.map((key) =>
          key.key_id === keyId ? { ...key, progress } : key
        );
        return obj;
      });
      setObjectives(updatedObjectives);
    } catch (error) {
      console.error('Error updating key progress:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        showProgressPage={showProgressPage}
        setShowProgressPage={setShowProgressPage}
      />
      <div className="max-w-4xl mx-auto p-6">
        {showProgressPage ? (
          <ProgressPage objectives={objectives} />
        ) : (
          <>
            <ObjectiveForm onAdd={handleAddObjective} />
            <ObjectiveList
              objectives={objectives}
              onDelete={handleDeleteObjective}
              onUpdateKeyProgress={handleUpdateKeyProgress}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
