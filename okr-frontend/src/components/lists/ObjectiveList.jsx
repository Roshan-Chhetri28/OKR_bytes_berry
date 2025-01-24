import React from 'react';
import KeyProgressBar from '../progress/KeyProgressBar';


const ObjectiveList = ({ objectives, onDelete, onUpdateKeyProgress }) => (
  <div className="mt-6 space-y-4">
    {objectives.map((obj) => (
      <div key={obj.objective_id} className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg">{obj.title}</h3>
        <p className="text-gray-600 mb-2">{obj.description}</p>
        <div className="space-y-2">
          {obj.keys.map((key) => (
            <KeyProgressBar
              key={key.key_id}
              keyItem={key}
              onUpdate={(progress) => onUpdateKeyProgress(key.key_id, progress)}
            />
          ))}
        </div>
        <button
          onClick={() => onDelete(obj.objective_id)}
          className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default ObjectiveList;
