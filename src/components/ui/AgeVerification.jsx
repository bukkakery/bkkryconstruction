import React from 'react';

const AgeVerification = ({ onConfirm }) => {

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md mx-auto transform transition-all scale-100 opacity-100">
        <img 
          src="https://github.com/bukkakery/BUKKRY-ASTS/blob/main/BUKKAKERY.COMLOGO.png?raw=true" 
          alt="Bukkakery Logo"
          className="w-48 mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Age Verification</h2>
        <p className="mb-8 text-lg text-gray-700">You must be 18 years or older to enter this site. Please confirm your age.</p>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={handleExit}
            className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold text-lg hover:bg-gray-400 transition-colors duration-300 shadow-lg"
          >
            Exit
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            I am 18 or older
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-6">
          By entering this site, you are agreeing to our Terms of Service and Privacy Policy. If you are not of legal age, please exit.
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;
