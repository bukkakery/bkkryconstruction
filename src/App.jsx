import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Send } from 'lucide-react';

function App() {
  const { toast } = useToast();
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

  return (
    <>
      <Helmet>
        <title>Bukkakery - Under Construction | Professional Casting</title>
        <meta name="description" content="Bukkakery is building something amazing. Join our professional castings for girls and guys. Come back soon!" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* ... keep existing code (background elements) */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-lg"></div>
        </div>

        <motion.main
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-12 z-10 max-w-4xl mx-auto flex-grow flex flex-col justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <img 
              src="https://drive.google.com/uc?export=view&id=10oPo5xjtvYU9YAhp21CqizBDesxuwlbx" 
              alt="Bukkakery Logo - Professional casting platform"
              className="max-w-md w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              We're building something amazing!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Our site is under construction. Get ready for something new!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-12 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={() => handleCastingClick('https://docs.google.com/forms/d/e/1FAIpQLSc2YkTX3niYNfODM8sHjwdZGqDy3eeL1P0FXIM3I7F8foxaVQ/viewform?usp=sharing&ouid=100736357196836765397')}
            >
              <img 
                src="https://drive.google.com/file/d/1mGTpbNihUPlKI0MohOkeYJqM4UIUKzxD"
                alt="Casting icon for girls - white drop"
                className="w-32 h-32 md:w-40 md:h-40 object-contain filter drop-shadow-2xl transition-transform duration-300"
              />
              <p className="text-xl font-bold text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Casting Girls</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={() => handleCastingClick('https://docs.google.com/forms/d/e/1FAIpQLSe8jIC5PG8wQEXbbUpzgLOVDSGnKDy6vMS7HDkPwViiOd62UQ/viewform?usp=sharing&ouid=100736357196836765397')}
            >
              <img 
                src="https://drive.google.com/file/d/1mGTpbNihUPlKI0MohOkeYJqM4UIUKzxD"
                alt="Casting icon for guys - splash design"
                className="w-32 h-32 md:w-40 md:h-40 object-contain filter drop-shadow-2xl transition-transform duration-300"
              />
              <p className="text-xl font-bold text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Casting Guys</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="max-w-lg mx-auto w-full pt-8"
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
          </motion.div>
        </motion.main>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="w-full text-center py-6 z-10"
        >
          <a href="mailto:info@bukkakery.com" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group">
            <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="font-medium">info@bukkakery.com</span>
          </a>
        </motion.footer>

        <Toaster />
      </div>
    </>
  );
}

export default App;
