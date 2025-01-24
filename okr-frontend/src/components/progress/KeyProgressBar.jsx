import React, { useState } from 'react';

const KeyProgressBar = ({ keyItem, onUpdate }) => {
  const [progress, setProgress] = useState(keyItem.progress);

  const handleProgressChange = (e) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
  };

  const handleUpdateClick = () => {
    onUpdate(progress);
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold">{keyItem.name}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="w-full"
      />
      <div className="flex justify-between items-center">
        <span className="text-sm">{progress}%</span>
        <button
          onClick={handleUpdateClick}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Update Progress
        </button>
      </div>
    </div>
  );
};

export default KeyProgressBar;
