"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button, Card } from '../../components/ui/components';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS } from '../../lib/data';

export default function QuizPage() {
  const router = useRouter();
  const { language, quizResponses, updateQuizResponse, t } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleNext = () => {
    if (isLastQuestion) {
      router.push('/report');
    } else {
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      router.push('/');
    }
  };

  const handleOptionSelect = (value: string | boolean) => {
    updateQuizResponse(currentQuestion.id, value);
    // Auto-advance for boolean/single choice for smoother UX
    // But maybe wait a tiny bit so they see the selection
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
            <span>{language === 'en' ? 'Question' : 'Pregunta'} {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              className="bg-teal-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
                {language === 'en' ? currentQuestion.text.en : currentQuestion.text.es}
              </h2>

              <div className="space-y-4">
                {currentQuestion.type === 'boolean' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleOptionSelect(true)}
                      className={`p-6 rounded-xl border-2 text-lg font-medium transition-all flex items-center justify-between group
                        ${quizResponses[currentQuestion.id] === true 
                          ? 'border-teal-600 bg-teal-50 text-teal-800' 
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50 text-slate-700'}`}
                    >
                      {language === 'en' ? 'Yes' : 'Sí'}
                      {quizResponses[currentQuestion.id] === true && <Check className="text-teal-600" />}
                    </button>
                    <button
                      onClick={() => handleOptionSelect(false)}
                      className={`p-6 rounded-xl border-2 text-lg font-medium transition-all flex items-center justify-between group
                        ${quizResponses[currentQuestion.id] === false 
                          ? 'border-teal-600 bg-teal-50 text-teal-800' 
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50 text-slate-700'}`}
                    >
                      {language === 'en' ? 'No' : 'No'}
                      {quizResponses[currentQuestion.id] === false && <Check className="text-teal-600" />}
                    </button>
                  </div>
                )}

                {currentQuestion.type === 'single' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect(option.value)}
                        className={`w-full p-5 rounded-xl border-2 text-left text-lg font-medium transition-all flex items-center justify-between group
                          ${quizResponses[currentQuestion.id] === option.value 
                            ? 'border-teal-600 bg-teal-50 text-teal-800' 
                            : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50 text-slate-700'}`}
                      >
                        {language === 'en' ? option.label.en : option.label.es}
                        {quizResponses[currentQuestion.id] === option.value && <Check className="text-teal-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            {t('btn.back')}
          </Button>
          
          {/* Only show Next if an answer is selected, or allow skip? 
              Requirement says "all questions optional", so we should allow Next always.
          */}
          <Button 
            onClick={handleNext}
            className="bg-slate-900 hover:bg-slate-800 text-white"
          >
            {isLastQuestion ? (language === 'en' ? 'See Results' : 'Ver Resultados') : t('btn.next')}
            {!isLastQuestion && <ArrowRight className="ml-2 w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

