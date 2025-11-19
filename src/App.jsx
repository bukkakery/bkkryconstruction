import React, { useState, useEffect } from 'react';
import CookieConsent from './components/ui/CookieConsent';

// --- LÓGICA DE COOKIES Y ANALYTICS ---
const FIREBASE_MEASUREMENT_ID = 'YOUR_FIREBASE_MEASUREMENT_ID'; // <-- REEMPLAZA ESTO

const loadAnalytics = () => {
  console.log("DEBUG: El usuario aceptó las cookies. Cargando Google Analytics...");

  // Añadir el script de gtag
  const gtagScript = document.createElement('script');
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${FIREBASE_MEASUREMENT_ID}`;
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  // Inicializar dataLayer y gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', FIREBASE_MEASUREMENT_ID);
  
  console.log("DEBUG: Google Analytics cargado.");
};


// --- COMPONENTES LOCALES PARA RESOLVER ERRORES ---

// Reemplazo para 'lucide-react'
const Mail = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const Send = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m22 2-7 20-4-9-5-2-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

// Contexto y hook para el sistema de toasts
const ToastContext = React.createContext();

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000); // Duración del toast
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (options) => setToast(options);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${toast.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}>\n          <h3 className="font-bold">{toast.title}</h3>
          {toast.description && <p className="text-sm">{toast.description}</p>}
        </div>
      )}
    </ToastContext.Provider>
  );
};
const useToast = () => React.useContext(ToastContext);

// Reemplazo para los componentes de la interfaz de usuario
const Input = ({ className, ...props }) => (
  <input className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-white transition-colors ${className}`} {...props} />
);
const Button = ({ className, children, ...props }) => (
  <button className={`flex items-center justify-center p-2 rounded-lg transition-colors ${className}`} {...props}>\n    {children}
  </button>
);

// --- CÓDIGO DE LA APLICACIÓN ---

function App() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'accepted') {
      loadAnalytics();
    }
  }, []);

  const handleCastingClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzYDOjU8OipcfrYwzT30TZYa8KR3qkmsk_rWpKeFqUYEXFfYoXYvI6ieJt3-V6jOlhU/exec';
    const formData = new FormData();
    formData.append('email', email);

    try {
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      if (data === "Success") {
        toast({
          title: "Subscription successful! 🎉",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
      } else {
        throw new Error(data || "An unknown error occurred.");
      }
    } catch (error) {
      console.error('Error submitting to Google Apps Script:', error);
      toast({
        title: "An error occurred.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ToastProvider>
      <CookieConsent />
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
          }
        `}
      </style>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-950 text-white font-montserrat">
        {/* This is a comment to create a change */}
        <title>Bukkakery - Under Construction | Professional Casting</title>
        <meta name="description" content="Bukkakery is building something amazing. Join our professional castings for girls and guys. Come back soon!" />
        
        <div className="absolute inset-0 opacity-10 blur-xl">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>

        <main className="text-center space-y-10 md:space-y-16 z-10 max-w-5xl mx-auto flex-grow flex flex-col justify-center">
          
          <div className="flex justify-center items-center transition-transform duration-600">
            <img 
              src="https://github.com/bukkakery/BUKKRY-ASTS/blob/main/BUKKAKERY.COMLOGO.png?raw=true" 
              alt="Bukkakery Logo - Professional casting platform"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto drop-shadow-2xl"
            />
          </div>

          <div className="space-y-4 transition-opacity duration-600 delay-300">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              We're building something amazing!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto">
              Our site is under construction. Get ready for something new and exciting!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 md:gap-12 justify-center items-center transition-opacity duration-600 delay-500 pt-4">
            
            <div 
              className="relative cursor-pointer group"
              onClick={() => handleCastingClick('https://docs.google.com/forms/d/e/1FAIpQLSc2YkTX3niYNfODM8sHjwdZGqDy3eeL1P0FXIM3I7F8foxaVQ/viewform?usp=sharing&ouid=100736357196836765397')}
            >
              <p className="text-xl md:text-2xl font-bold text-white mb-3 transition-transform duration-300 group-hover:-translate-y-1">For Girls</p>
              <img 
                src="https://raw.githubusercontent.com/bukkakery/BUKKRY-ASTS/main/GRILS.png"
                alt="Casting icon for girls - white drop"
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            <div 
              className="relative cursor-pointer group"
              onClick={() => handleCastingClick('https://docs.google.com/forms/d/e/1FAIpQLSe8jIC5PG8wQEXbbUpzgLOVDSGnKDy6vMS7HDkPwViiOd62UQ/viewform?usp=sharing&ouid=100736367873497869687')}
            >
              <p className="text-xl md:text-2xl font-bold text-white mb-3 transition-transform duration-300 group-hover:-translate-y-1">For Guys</p>
              <img 
                src="https://github.com/bukkakery/BUKKRY-ASTS/blob/main/GUYS.png?raw=true"
                alt="Casting icon for guys - splash design"
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
          
          <div className="max-w-md mx-auto w-full pt-8 transition-opacity duration-600 delay-700">
            <p className="text-base md:text-lg text-white/90 mb-4 font-semibold">
              Subscribe to stay up to date with the latest news
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm p-2 rounded-xl border border-white/30 shadow-lg">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-base flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Button type="submit" className="bg-white/30 hover:bg-white/50 rounded-lg p-2.5" disabled={isSubmitting}>
                <Send className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>
        </main>

        <footer className="w-full text-center py-6 z-10 transition-opacity duration-600 delay-900">
          <div className="text-white/80 text-sm">
            <p>&copy; 2024 Neon Bulb, S.L. All rights reserved.</p>
            <nav className="flex justify-center items-center flex-wrap gap-x-3 gap-y-2 mt-2">
              <a href="/legal-notice.html" className="hover:text-white transition-colors duration-300">Legal Notice</a>
              <span className="text-white/50">&bull;</span>
              <a href="/privacy-policy.html" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <span className="text-white/50">&bull;</span>
              <a href="/cookie-policy.html" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
              <span className="text-white/50">&bull;</span>
              <a href="/contact.html" className="hover:text-white transition-colors duration-300">Contact</a>
              <span className="text-white/50">&bull;</span>
              <a href="/terms-and-conditions.html" className="hover:text-white transition-colors duration-300">Terms & Conditions</a>
              <span className="text-white/50">&bull;</span>
              <a href="/products-services-pricing.html" className="hover:text-white transition-colors duration-300">Products, Services, and Pricing</a>
            </nav>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}

export default App;
