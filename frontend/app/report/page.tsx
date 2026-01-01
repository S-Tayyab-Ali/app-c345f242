"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, DollarSign, ArrowRight, Printer, Share2, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui/components';
import { useApp } from '../../context/AppContext';
import { RECOMMENDATIONS, PROFESSIONAL_GUIDANCE } from '../../lib/data';
import { Recommendation } from '../../lib/types';

export default function ReportPage() {
  const { language, quizResponses, t } = useApp();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    // Filter recommendations based on quiz responses
    const relevant = RECOMMENDATIONS.filter(rec => rec.triggerCondition(quizResponses));
    setRecommendations(relevant);
  }, [quizResponses]);

  const getCostLabel = (cost: string) => {
    if (cost === '$') return language === 'en' ? 'Low Cost (<$50)' : 'Bajo Costo (<$50)';
    if (cost === '$$') return language === 'en' ? 'Medium ($50-$500)' : 'Medio ($50-$500)';
    return language === 'en' ? 'Investment (>$500)' : 'Inversión (>$500)';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DIY': return 'bg-green-100 text-green-800';
      case 'Low-Cost': return 'bg-blue-100 text-blue-800';
      case 'Professional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleFeedback = (helpful: boolean) => {
    // In a real app, send to backend
    setFeedbackSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mb-4"
          >
            <CheckCircle size={32} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            {language === 'en' ? "Your Safety Report" : "Su Informe de Seguridad"}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Based on your answers, here are the top recommended changes to make your home safer." 
              : "Basado en sus respuestas, aquí están los cambios recomendados para hacer su hogar más seguro."}
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col border-t-4 border-t-teal-500 hover:shadow-md transition-shadow">
                  <div className="p-6 flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                      <Badge className={getCategoryColor(rec.category)}>
                        {rec.category}
                      </Badge>
                      <span className="text-sm font-medium text-slate-500 flex items-center" title={getCostLabel(rec.cost)}>
                        {rec.cost}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {language === 'en' ? rec.title.en : rec.title.es}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {language === 'en' ? rec.description.en : rec.description.es}
                    </p>
                  </div>
                  <div className="px-6 pb-6 pt-0 mt-auto">
                    <Link href="/resources">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? "Find Help" : "Buscar Ayuda"}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {language === 'en' ? "Great news!" : "¡Buenas noticias!"}
              </h3>
              <p className="text-slate-600">
                {language === 'en' 
                  ? "Based on your answers, we don't have any specific high-priority recommendations. However, it's always good to stay proactive." 
                  : "Basado en sus respuestas, no tenemos recomendaciones específicas de alta prioridad. Sin embargo, siempre es bueno mantenerse proactivo."}
              </p>
            </div>
          )}
        </div>

        {/* Who to Ask Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {language === 'en' ? "Who to Ask & What to Ask" : "A Quién Preguntar y Qué Preguntar"}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {PROFESSIONAL_GUIDANCE.map((guide) => (
              <div key={guide.id} className="space-y-4">
                <h3 className="text-lg font-bold text-teal-700 flex items-center gap-2">
                  <div className="w-2 h-8 bg-teal-500 rounded-full" />
                  {language === 'en' ? guide.role.en : guide.role.es}
                </h3>
                <p className="text-slate-600 text-sm">
                  {language === 'en' ? guide.description.en : guide.description.es}
                </p>
                
                <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {language === 'en' ? "When to call:" : "Cuándo llamar:"}
                  </p>
                  <p className="text-sm text-slate-700">
                    {language === 'en' ? guide.whenToCall.en : guide.whenToCall.es}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {language === 'en' ? "Key questions:" : "Preguntas clave:"}
                  </p>
                  <ul className="space-y-2">
                    {(language === 'en' ? guide.whatToAsk.en : guide.whatToAsk.es).map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-teal-500 mt-1">•</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        {!feedbackSent ? (
          <div className="bg-slate-100 rounded-2xl p-6 text-center max-w-md mx-auto">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              {language === 'en' ? "Was this report helpful?" : "¿Fue útil este informe?"}
            </h4>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm" onClick={() => handleFeedback(true)} className="bg-white hover:bg-green-50 hover:text-green-700 hover:border-green-200">
                <ThumbsUp size={16} className="mr-2" />
                {language === 'en' ? "Yes" : "Sí"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleFeedback(false)} className="bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-200">
                <ThumbsDown size={16} className="mr-2" />
                {language === 'en' ? "No" : "No"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 rounded-2xl p-6 text-center max-w-md mx-auto border border-green-100">
            <p className="text-green-800 font-medium">
              {language === 'en' ? "Thank you for your feedback!" : "¡Gracias por sus comentarios!"}
            </p>
          </div>
        )}

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:p-6 z-40">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-sm text-slate-500 hidden sm:block">
              {language === 'en' ? "Ready to take the next step?" : "¿Listo para dar el siguiente paso?"}
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Link href="/resources" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full">
                  {t('nav.resources')}
                </Button>
              </Link>
              <Link href="/plan" className="flex-1 sm:flex-none">
                <Button className="w-full shadow-lg shadow-teal-500/20">
                  {language === 'en' ? "Create My Plan" : "Crear Mi Plan"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Spacer for fixed bottom bar */}
        <div className="h-24" />
      </div>
    </div>
  );
}

