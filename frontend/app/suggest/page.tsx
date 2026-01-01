"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button, Card } from '../../components/ui/components';
import { useApp } from '../../context/AppContext';

export default function SuggestPage() {
  const { language } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resourceName: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 py-12 px-4 flex items-center justify-center">
        <Card className="max-w-md w-full p-8 text-center bg-slate-900 border-slate-800">
          <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-800">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            {language === 'en' ? "Thank You!" : "¡Gracias!"}
          </h2>
          <p className="text-slate-400 mb-8">
            {language === 'en' 
              ? "We've received your suggestion. Our team will review it shortly." 
              : "Hemos recibido su sugerencia. Nuestro equipo la revisará en breve."}
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            {language === 'en' ? "Submit Another" : "Enviar Otro"}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">
            {language === 'en' ? "Suggest a Resource" : "Sugerir un Recurso"}
          </h1>
          <p className="text-slate-400">
            {language === 'en' 
              ? "Help us build the most trusted directory for Orange County seniors." 
              : "Ayúdenos a construir el directorio más confiable para personas mayores del Condado de Orange."}
          </p>
        </div>

        <Card className="p-8 bg-slate-900 border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {language === 'en' ? "Resource Name" : "Nombre del Recurso"}
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"
                value={formData.resourceName}
                onChange={(e) => setFormData({...formData, resourceName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {language === 'en' ? "Description & Services" : "Descripción y Servicios"}
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {language === 'en' ? "Your Name" : "Su Nombre"}
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {language === 'en' ? "Your Email" : "Su Correo Electrónico"}
                </label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              {language === 'en' ? "Submit Suggestion" : "Enviar Sugerencia"}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

