"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Heart, Home, CheckCircle } from 'lucide-react';
import { Button, Card } from '../components/ui/components';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { t, language } = useApp();

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: { en: "Safety First", es: "Seguridad Primero" },
      description: { 
        en: "Identify fall risks and hazards in your home before they cause problems.", 
        es: "Identifique riesgos de caídas y peligros en su hogar antes de que causen problemas." 
      }
    },
    {
      icon: <Home className="w-8 h-8 text-orange-500" />,
      title: { en: "Personalized Plan", es: "Plan Personalizado" },
      description: { 
        en: "Get a custom report with actionable steps tailored to your specific home setup.", 
        es: "Obtenga un informe personalizado con pasos prácticos adaptados a la configuración específica de su hogar." 
      }
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: { en: "Trusted Resources", es: "Recursos Confiables" },
      description: { 
        en: "Connect with verified local providers and funding options in Orange County.", 
        es: "Conéctese con proveedores locales verificados y opciones de financiamiento en el Condado de Orange." 
      }
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-100 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
          >
            {language === 'en' ? "Age at Home with " : "Envejezca en Casa con "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
              {language === 'en' ? "Confidence" : "Confianza"}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {language === 'en' 
              ? "A simple, step-by-step guide to making your home safer, finding trusted help, and staying independent."
              : "Una guía sencilla paso a paso para hacer su hogar más seguro, encontrar ayuda confiable y mantenerse independiente."}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/quiz">
              <Button size="lg" className="w-full sm:w-auto group">
                {t('btn.start')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t('nav.resources')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-8 h-full hover:shadow-md transition-shadow border-t-4 border-t-teal-500">
                  <div className="mb-4 bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {language === 'en' ? feature.title.en : feature.title.es}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {language === 'en' ? feature.description.en : feature.description.es}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {language === 'en' ? "How It Works" : "Cómo Funciona"}
            </h2>
            <p className="text-lg text-slate-600">
              {language === 'en' ? "Three simple steps to a safer home." : "Tres pasos sencillos para un hogar más seguro."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-200 -z-10" />

            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white border-4 border-teal-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-3xl font-bold text-teal-600">{step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step === 1 && (language === 'en' ? "Take the Quiz" : "Tome el Cuestionario")}
                  {step === 2 && (language === 'en' ? "Get Recommendations" : "Obtenga Recomendaciones")}
                  {step === 3 && (language === 'en' ? "Take Action" : "Tome Acción")}
                </h3>
                <p className="text-slate-600 max-w-xs">
                  {step === 1 && (language === 'en' ? "Answer 5-7 simple questions about your home and needs." : "Responda 5-7 preguntas sencillas sobre su hogar y necesidades.")}
                  {step === 2 && (language === 'en' ? "Receive a personalized report with prioritized safety changes." : "Reciba un informe personalizado con cambios de seguridad priorizados.")}
                  {step === 3 && (language === 'en' ? "Connect with trusted local pros or find DIY solutions." : "Conéctese con profesionales locales de confianza o encuentre soluciones de bricolaje.")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'en' ? "Ready to make your home safer?" : "¿Listo para hacer su hogar más seguro?"}
          </h2>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Join hundreds of Orange County residents who are aging in place with confidence." 
              : "Únase a cientos de residentes del Condado de Orange que están envejeciendo en casa con confianza."}
          </p>
          <Link href="/quiz">
            <Button size="lg" className="bg-white text-teal-800 hover:bg-teal-50 border-none shadow-xl">
              {t('btn.start')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

