import React, { useState } from 'react';
//  useForm Hook
const ObjectiveForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keys, setKeys] = useState('');
  const [progress, setProgress] = useState(0); // Track progress as a number

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const objectiveData = {
        title,
        description,
        keys,
        progress: Number(progress)
        
      };
      onAdd(objectiveData);
      setTitle('');
      setDescription('');
      setKeys('');
      setProgress(0); // Reset progress to 0
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Objective Title"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full mb-4 p-2 border rounded"
      ></textarea>
      <textarea
        value={keys}
        onChange={(e) => setKeys(e.target.value)}
        placeholder="Add Key"
        className="w-full mb-4 p-2 border rounded"
      ></textarea>
      <input
        type="number"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        placeholder="Progress (0-100)"
        className="w-full mb-4 p-2 border rounded"
        min="0"
        max="100"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Objective
      </button>
    </form>
  );
};

export default ObjectiveForm;
