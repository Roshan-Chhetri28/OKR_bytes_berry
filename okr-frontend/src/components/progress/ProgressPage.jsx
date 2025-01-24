
import React from 'react';
import ProgressBar from './ProgressBar';

const ProgressPage = ({ objectives = [] }) => {
  const total = objectives.length;

  const completed = objectives.filter(
    (obj) => Array.isArray(obj.keys) && obj.keys.every((key) => key.progress === 100)
  ).length;

  const average =
    total > 0
      ? objectives.reduce(
          (sum, obj) =>
            sum +
            (Array.isArray(obj.keys)
              ? obj.keys.reduce((keySum, key) => keySum + key.progress, 0) / (obj.keys.length || 1)
              : 0),
          0
        ) / total
      : 0;

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Progress Summary</h2>
      <p>Total Objectives: {total}</p>
      <p>Completed Objectives: {completed}</p>
      <p>Average Progress: {average.toFixed(2)}%</p>
      <div className="mt-4 space-y-4">
        {objectives.map((obj) => (
          <div
            key={obj.objective_id}
            className="bg-gray-100 text-black p-4 rounded-lg shadow-sm"
          >
            <h4 className="font-bold">{obj.title}</h4>
            <ProgressBar
              progress={
                Array.isArray(obj.keys)
                  ? obj.keys.reduce((sum, key) => sum + key.progress, 0) / (obj.keys.length || 1)
                  : 0
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;