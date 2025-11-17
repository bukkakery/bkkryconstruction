
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
        Configuración de Cookies
      </button>
    );
  }

  // If settings are open, show the settings modal
  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Configuración de Cookies</h2>
          <p className="mb-4">
            A continuación, puede habilitar o deshabilitar los tipos de cookies que utilizamos.
          </p>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="font-bold">Necesarias</span>
                <input
                  type="checkbox"
                  checked={settings.necessary}
                  disabled
                  className="form-checkbox h-5 w-5"
                />
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
              </p>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span className="font-bold">Analíticas</span>
                <input
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={() => handleToggleSetting('analytics')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Estas cookies nos ayudan a entender cómo los visitantes interactúan con el sitio web mediante la recopilación de información de forma anónima.
              </p>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span className="font-bold">Publicidad</span>
                <input
                  type="checkbox"
                  checked={settings.advertising}
                  onChange={() => handleToggleSetting('advertising')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Estas cookies se utilizan para rastrear a los visitantes a través de los sitios web con la intención de mostrar anuncios relevantes y atractivos.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleSaveSettings}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar Configuración
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Cancelar
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
        En esta web utilizamos cookies propias y de terceros para analizar el uso del sitio web y mostrarte publicidad relacionada con tus preferencias sobre la base de un perfil elaborado a partir de tus hábitos de navegación (por ejemplo, páginas visitadas). Puede consultar nuestra&nbsp; 
          <a href="/cookie-policy.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">Política de Cookies aquí</a>.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAcceptAll}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            ACEPTAR TODAS
          </button>
          <button
            onClick={handleRejectAll}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            RECHAZAR TODAS
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            CONFIGURAR
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default CookieConsent;
