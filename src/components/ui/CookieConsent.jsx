
import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [consent, setConsent] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    necessary: true,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    } else {
      // Show the banner if no consent has been given
      setConsent({});
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    const newConsent = {
      ...settings,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowSettings(false);
  };

  const handleToggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handleRevokeConsent = () => {
    setConsent({});
    setShowSettings(false);
  };

  // Do not render anything if consent has been given and settings are not open
  if (consent && consent.timestamp && !showSettings) {
    return (
        <button
        onClick={handleRevokeConsent}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        Cookie Settings
      </button>
    );
  }

  // If settings are open, show the settings modal
  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Cookie Settings</h2>
          <p className="mb-4">
            Below, you can enable or disable the types of cookies we use.
          </p>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="font-bold">Necessary</span>
                <input
                  type="checkbox"
                  checked={settings.necessary}
                  disabled
                  className="form-checkbox h-5 w-5"
                />
              </label>
              <p className="text-sm text-gray-600 mt-1">
                These cookies are essential for the website to function and cannot be disabled.
              </p>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span className="font-bold">Analytics</span>
                <input
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={() => handleToggleSetting('analytics')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
              <p className="text-sm text-gray-600 mt-1">
                These cookies help us understand how visitors interact with the website by collecting information anonymously.
              </p>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span className="font-bold">Advertising</span>
                <input
                  type="checkbox"
                  checked={settings.advertising}
                  onChange={() => handleToggleSetting('advertising')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
              <p className="text-sm text-gray-600 mt-1">
                These cookies are used to track visitors across websites with the intention of displaying relevant and engaging ads.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleSaveSettings}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Settings
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show the main consent banner if no consent decision has been made
  if (!consent || !consent.timestamp) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-50">
        <p className="mb-4">
        This website uses its own and third-party cookies to analyze the use of the website and show you advertising related to your preferences based on a profile created from your browsing habits (for example, pages visited). You can consult our&nbsp;
          <a href="/cookie-policy.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">Cookie Policy here</a>.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAcceptAll}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            ACCEPT ALL
          </button>
          <button
            onClick={handleRejectAll}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            REJECT ALL
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            SETTINGS
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default CookieConsent;
