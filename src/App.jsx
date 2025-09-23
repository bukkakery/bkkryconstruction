import React, { useState, useEffect } from 'react';

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
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${toast.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}>
          <h3 className="font-bold">{toast.title}</h3>
          {toast.description && <p className="text-sm">{toast.description}</p>}
        </div>
      )}
    </ToastContext.Provider>
  );
};
const useToast = () => React.useContext(ToastContext);

const Toaster = () => null; // No necesitamos un componente separado, el proveedor ya lo renderiza

// Reemplazo para los componentes de la interfaz de usuario
const Input = ({ className, ...props }) => (
  <input className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-white transition-colors ${className}`} {...props} />
);
const Button = ({ className, children, ...props }) => (
  <button className={`flex items-center justify-center p-2 rounded-lg transition-colors ${className}`} {...props}>
    {children}
  </button>
);

// --- CÓDIGO DE LA APLICACIÓN ---

function App() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCastingClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNewsletterSubmit = async (e) => {
    // LÍNEA DE DEBUG: Inicio de la función
    console.log("DEBUG: handleNewsletterSubmit se ha iniciado."); 

    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      // LÍNEA DE DEBUG: Email inválido
      console.log("DEBUG: Email inválido."); 
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // LÍNEA DE DEBUG: Email válido, antes de enviar
    console.log("DEBUG: Email válido, intentando enviar:", email); 

    // ¡Asegúrate de que esta URL sea la ÚLTIMA y CORRECTA!
    // Esta línea es la que debes haber actualizado con el último URL de Apps Script.
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzYDOjU8OipcfrYwzT30TZYa8KR3qkmsk_rWpKeFqUYEXFfYoXYvI6ieJt3-V6jOlhU/exec';
    const formData = new FormData();
    formData.append('email', email);

    // LÍNEA DE DEBUG: Antes de la llamada fetch
    console.log("DEBUG: Enviando POST a:", appsScriptUrl); 

    try {
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        body: formData,
      });
      // LÍNEA DE DEBUG: Después de recibir la respuesta de fetch
      console.log("DEBUG: Respuesta de fetch recibida (status:", response.status, response.statusText, ")."); 

      const data = await response.text();
      // LÍNEA DE DEBUG: Contenido de la respuesta
      console.log("DEBUG: Datos de respuesta del Apps Script:", data); 

      if (data === "Success") {
        toast({
          title: "Subscription successful! 🎉",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
        // LÍNEA DE DEBUG: Suscripción exitosa
        console.log("DEBUG: Suscripción exitosa."); 
      } else {
        // LÍNEA DE DEBUG: Error del Apps Script (no "Success")
        console.log("DEBUG: Apps Script no devolvió 'Success'. Respuesta:", data); 
        throw new Error(data || "An unknown error occurred.");
      }
    } catch (error) {
      // LÍNEA DE DEBUG: Error general en la llamada fetch
      console.error('DEBUG: Error en la llamada fetch al Apps Script:', error); 
      toast({
        title: "An error occurred.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      // LÍNEA DE DEBUG: Envío finalizado
      console.log("DEBUG: Envío finalizado."); 
    }
  };
  
  // Se ha eliminado 'Helmet' ya que causaba un error de compilación.
  // Las etiquetas de meta y título se han colocado directamente en el JSX.
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gray-900 text-white font-sans">
        <title>Bukkakery - Under Construction | Professional Casting</title>
        <meta name="description" content="Bukkakery is building something amazing. Join our professional castings for girls and guys. Come back soon!" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-lg"></div>
        </div>

        <main
          className="text-center space-y-12 z-10 max-w-4xl mx-auto flex-grow flex flex-col justify-center"
        >
          <div
            className="flex justify-center items-center transition-transform duration-600"
          >
            {/* Se ha cambiado el enlace de marcador de posición por el enlace original de Google Drive */}
            <img 
              src="https://drive.google.com/uc?export=view&id=10oPo5xjtvYU9YAhp21CqizBDesxuwlbx" 
              alt="Bukkakery Logo - Professional casting platform"
              className="max-w-md w-full h-auto drop-shadow-2xl"
            />
          </div>

          <div
            className="space-y-4 transition-opacity duration-600 delay-300"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              We're building something amazing!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Our site is under construction. Get ready for something new!
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-12 justify-center items-center transition-opacity duration-600 delay-500"
          >
            <div
              className="cursor-pointer group hover:scale-110 hover:-translate-y-2 transition-transform duration-300"
              onClick={() => handleCastingClick('https://docs.google.com/forms/d/e/1FAIpQLSc2YkTX3niYNfODM8sHjwdZGqDy3eeL1P0FXIM3I7F8foxaVQ/viewform?usp=sharing&ouid=100736357196836765397')}
            >
              {/* Se ha cambiado el enlace de marcador de posición por el enlace original de Google Drive */}
              <img 
                src="https://drive.google.com/uc?export=view&id=1mGTpbNihUPlKI0MohOkeYJqM4UIUKzxD"
                alt="Casting icon for girls - white drop"
                className="w-32 h-32 md:w-40 md:h-40 object-contain filter drop-shadow-2xl"
              />
              <p className="text-xl font-bold text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Casting Girls</p>
            </div>

            <div
              className="cursor-pointer group hover:scale-110 hover:-translate-y-2 transition-transform duration-300"
              onClick={() => handleCastingClick('https://docs.google.com/forms/d/e/1FAIpQLSe8jIC5PG8wQEXbbUpzgLOVDSGnKDy6vMS7HDkPwViiOd62UQ/viewform?usp=sharing&ouid=100736357196836765397')}
            >
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/80681178-fc08-4941-ba65-12e11bf9f38e/bb6e600ded531ba611bd4811ab6f85f0.png"
                alt="Casting icon for guys - splash design"
                className="w-32 h-32 md:w-40 md:h-40 object-contain filter drop-shadow-2xl"
              />
              <p className="text-xl font-bold text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Casting Guys</p>
            </div>
          </div>

          <div
            className="max-w-lg mx-auto w-full pt-8 transition-opacity duration-600 delay-700"
          >
            <p className="text-lg text-white/90 mb-4 font-semibold">
              Subscribe to stay up to date with the latest news
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm p-2 rounded-xl border border-white/30 shadow-lg">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Button type="submit" size="icon" className="bg-white/30 hover:bg-white/50 rounded-lg" disabled={isSubmitting}>
                <Send className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>
        </main>

        <footer 
          className="w-full text-center py-6 z-10 transition-opacity duration-600 delay-900"
        >
          <a href="mailto:info@bukkakery.com" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group">
            <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="font-medium">info@bukkakery.com</span>
          </a>
        </footer>
      </div>
    </ToastProvider>
  );
}

export default App;
