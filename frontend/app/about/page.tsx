"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, HelpCircle, Mail } from 'lucide-react';
import { Card } from '../../components/ui/components';
import { useApp } from '../../context/AppContext';

export default function AboutPage() {
  const { language } = useApp();

  const faqs = [
    {
      q: { en: "Is this service really free?", es: "¿Es este servicio realmente gratuito?" },
      a: { 
        en: "Yes. Aging at Home Hub is a community resource designed to help seniors and families. We do not sell products or charge for our guide.", 
        es: "Sí. Aging at Home Hub es un recurso comunitario diseñado para ayudar a las personas mayores y sus familias. No vendemos productos ni cobramos por nuestra guía." 
      }
    },
    {
      q: { en: "Do you recommend specific contractors?", es: "¿Recomiendan contratistas específicos?" },
      a: { 
        en: "We provide a directory of verified local professionals who have experience with aging-in-place modifications. We do not endorse any single provider.", 
        es: "Proporcionamos un directorio de profesionales locales verificados que tienen experiencia con modificaciones para envejecer en casa. No respaldamos a ningún proveedor en particular." 
      }
    },
    {
      q: { en: "Is my data private?", es: "¿Son privados mis datos?" },
      a: { 
        en: "Absolutely. Your quiz responses and plan are stored only on your device (in your browser). We do not collect or sell your personal information.", 
        es: "Absolutamente. Sus respuestas al cuestionario y su plan se almacenan solo en su dispositivo (en su navegador). No recopilamos ni vendemos su información personal." 
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero / Mission */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
            {language === 'en' ? "About Us" : "Sobre Nosotros"}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'en' 
              ? "We believe everyone deserves to age in the place they call home with safety, dignity, and independence." 
              : "Creemos que todos merecen envejecer en el lugar que llaman hogar con seguridad, dignidad e independencia."}
          </p>
        </div>

        {/* Purpose Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto text-teal-600">
              <Shield size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">
              {language === 'en' ? "Safety First" : "Seguridad Primero"}
            </h3>
            <p className="text-slate-600 text-sm">
              {language === 'en' 
                ? "Evidence-based recommendations to reduce fall risks." 
                : "Recomendaciones basadas en evidencia para reducir riesgos de caídas."}
            </p>
          </Card>
          <Card className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600">
              <Users size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">
              {language === 'en' ? "Community Driven" : "Impulsado por la Comunidad"}
            </h3>
            <p className="text-slate-600 text-sm">
              {language === 'en' 
                ? "Connecting you with trusted local resources in Orange County." 
                : "Conectándolo con recursos locales confiables en el Condado de Orange."}
            </p>
          </Card>
          <Card className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
              <HelpCircle size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">
              {language === 'en' ? "Plain Language" : "Lenguaje Sencillo"}
            </h3>
            <p className="text-slate-600 text-sm">
              {language === 'en' 
                ? "No technical jargon. Just clear, actionable advice." 
                : "Sin jerga técnica. Solo consejos claros y prácticos."}
            </p>
          </Card>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            {language === 'en' ? "Frequently Asked Questions" : "Preguntas Frecuentes"}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                <h3 className="font-bold text-lg text-slate-800 mb-2">
                  {language === 'en' ? faq.q.en : faq.q.es}
                </h3>
                <p className="text-slate-600">
                  {language === 'en' ? faq.a.en : faq.a.es}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {language === 'en' ? "Contact Us" : "Contáctenos"}
          </h2>
          <p className="text-slate-600">
            {language === 'en' 
              ? "Have questions or suggestions? We'd love to hear from you." 
              : "¿Tiene preguntas o sugerencias? Nos encantaría saber de usted."}
          </p>
          <a 
            href="mailto:hello@agingathomehub.demo" 
            className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
          >
            <Mail size={20} />
            hello@agingathomehub.demo
          </a>
        </div>

      </div>
    </div>
  );
}

