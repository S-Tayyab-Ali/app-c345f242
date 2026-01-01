"use client";

import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';
import { Card } from '../../components/ui/components';
import { useApp } from '../../context/AppContext';

export default function PrivacyPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            {language === 'en' ? "Privacy Policy" : "Política de Privacidad"}
          </h1>
          <p className="text-slate-500 mt-2">
            {language === 'en' ? "Last Updated: May 2024" : "Última Actualización: Mayo 2024"}
          </p>
        </div>

        <Card className="p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Eye className="text-teal-500" size={20} />
              {language === 'en' ? "No Data Collection" : "Sin Recopilación de Datos"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {language === 'en' 
                ? "Aging at Home Hub is designed with privacy as a core principle. We do not require you to create an account, and we do not store your quiz responses or personal plans on our servers." 
                : "Aging at Home Hub está diseñado con la privacidad como principio fundamental. No requerimos que cree una cuenta y no almacenamos sus respuestas al cuestionario ni sus planes personales en nuestros servidores."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="text-teal-500" size={20} />
              {language === 'en' ? "Local Storage" : "Almacenamiento Local"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {language === 'en' 
                ? "All data you enter (quiz answers, language preference) is stored locally on your device using browser 'localStorage'. This allows you to return to the site and see your previous results without logging in. You can clear this data at any time by clearing your browser history." 
                : "Todos los datos que ingresa (respuestas al cuestionario, preferencia de idioma) se almacenan localmente en su dispositivo utilizando el 'localStorage' del navegador. Esto le permite regresar al sitio y ver sus resultados anteriores sin iniciar sesión. Puede borrar estos datos en cualquier momento borrando el historial de su navegador."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {language === 'en' ? "External Links" : "Enlaces Externos"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {language === 'en' 
                ? "Our resource directory contains links to third-party websites. We are not responsible for the privacy practices or content of these external sites." 
                : "Nuestro directorio de recursos contiene enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad o el contenido de estos sitios externos."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {language === 'en' ? "Contact Us" : "Contáctenos"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {language === 'en' 
                ? "If you have questions about our privacy practices, please contact us at hello@agingathomehub.demo." 
                : "Si tiene preguntas sobre nuestras prácticas de privacidad, contáctenos en hello@agingathomehub.demo."}
            </p>
          </section>
        </Card>

      </div>
    </div>
  );
}

