
import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center">
      <p className="mb-2">
        This site uses cookies to enhance your experience. By clicking "Accept", you consent to the use of all cookies. 
        <a href="/cookie-policy.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">Learn more</a>.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Accept
      </button>
      <button
        onClick={declineCookies}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Decline
      </button>
    </div>
  );
};

export default CookieConsent;
