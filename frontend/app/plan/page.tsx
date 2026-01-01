"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, Share2, Download, CheckSquare, Calendar } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui/components';
import { useApp } from '../../context/AppContext';
import { RECOMMENDATIONS, PROFESSIONAL_GUIDANCE } from '../../lib/data';
import { Recommendation } from '../../lib/types';

export default function PlanPage() {
  const { language, quizResponses, t } = useApp();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const relevant = RECOMMENDATIONS.filter(rec => rec.triggerCondition(quizResponses));
    setRecommendations(relevant);
  }, [quizResponses]);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: "My_Aging_At_Home_Plan",
  });

  const currentDate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">
              {language === 'en' ? "My Home Plan" : "Mi Plan del Hogar"}
            </h1>
            <p className="text-slate-400 text-sm">
              {language === 'en' ? "Your personalized guide to action." : "Su guía personalizada para la acción."}
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => handlePrint && handlePrint()} className="flex items-center gap-2">
              <Printer size={18} />
              {t('btn.print')}
            </Button>
          </div>
        </div>

        {/* Printable Content Area - KEEP LIGHT FOR PRINTING */}
        <div ref={contentRef} className="bg-white text-slate-900 p-8 md:p-12 rounded-none md:rounded-3xl shadow-sm border border-slate-200 print:shadow-none print:border-none print:p-0">
          
          {/* Plan Header */}
          <div className="border-b border-slate-200 pb-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Aging at Home Hub</h2>
                <p className="text-slate-500">
                  {language === 'en' ? "Personalized Safety Action Plan" : "Plan de Acción de Seguridad Personalizado"}
                </p>
              </div>
              <div className="text-right text-sm text-slate-500">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <Calendar size={14} />
                  {currentDate}
                </div>
                <p>agingathomehub.com</p>
              </div>
            </div>
            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 text-teal-800 text-sm">
              <strong>{language === 'en' ? "Goal:" : "Meta:"}</strong> {language === 'en' 
                ? "To create a safer, more comfortable home environment that supports independence." 
                : "Crear un ambiente hogareño más seguro y cómodo que apoye la independencia."}
            </div>
          </div>

          {/* Priority Actions */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckSquare className="text-teal-600" />
              {language === 'en' ? "Priority Actions" : "Acciones Prioritarias"}
            </h3>
            
            <div className="space-y-6">
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <div key={rec.id} className="flex gap-4 p-4 border border-slate-200 rounded-xl break-inside-avoid">
                    <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-slate-900">{language === 'en' ? rec.title.en : rec.title.es}</h4>
                        <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">{rec.category}</Badge>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">
                        {language === 'en' ? rec.description.en : rec.description.es}
                      </p>
                      <div className="text-xs text-slate-400 font-medium">
                        {language === 'en' ? "Estimated Cost:" : "Costo Estimado:"} {rec.cost}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">
                  {language === 'en' ? "No specific high-priority actions identified based on your answers." : "No se identificaron acciones específicas de alta prioridad basadas en sus respuestas."}
                </p>
              )}
            </div>
          </div>

          {/* Professional Guidance Summary */}
          <div className="mb-10 break-inside-avoid">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {language === 'en' ? "Who to Contact" : "A Quién Contactar"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROFESSIONAL_GUIDANCE.map((guide) => (
                <div key={guide.id} className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-teal-800 mb-2 text-sm">
                    {language === 'en' ? guide.role.en : guide.role.es}
                  </h4>
                  <p className="text-xs text-slate-600 mb-3">
                    {language === 'en' ? guide.whenToCall.en : guide.whenToCall.es}
                  </p>
                  <div className="text-xs text-slate-500">
                    <strong>{language === 'en' ? "Ask:" : "Pregunte:"}</strong> "{(language === 'en' ? guide.whatToAsk.en : guide.whatToAsk.es)[0]}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="border-t border-slate-200 pt-8 break-inside-avoid">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {language === 'en' ? "My Notes" : "Mis Notas"}
            </h3>
            <div className="h-40 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50"></div>
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-12 text-center text-xs text-slate-400 border-t border-slate-100 pt-6">
            <p>
              {language === 'en' 
                ? "Disclaimer: This plan is for informational purposes only and does not constitute medical or construction advice. Please consult with qualified professionals." 
                : "Descargo de responsabilidad: Este plan es solo para fines informativos y no constituye asesoramiento médico o de construcción. Consulte con profesionales calificados."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

