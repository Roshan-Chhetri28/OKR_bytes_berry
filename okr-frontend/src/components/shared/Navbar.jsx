import React from 'react';

const Navbar = ({ showProgressPage, setShowProgressPage }) => (
  <nav className="bg-black border text-white p-4 shadow-md">
    <div className="flex justify-between items-center max-w-4xl mx-auto">
      <h1 className="text-xl font-bold">OKR Tracker</h1>
      <div>
        <button
          onClick={() => setShowProgressPage(false)}
          className={`py-2 px-4 rounded-lg ${
            !showProgressPage ? 'bg-white text-blue-500' : 'bg-blue-500'
          }`}
        >
          Objectives
        </button>
        <button
          onClick={() => setShowProgressPage(true)}
          className={`py-2 px-4 rounded-lg ml-2 ${
            showProgressPage ? 'bg-white text-blue-500' : 'bg-blue-500'
          }`}
        >
          Progress
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;