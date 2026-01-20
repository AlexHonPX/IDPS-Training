import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, RefreshCcw, ArrowRight } from 'lucide-react';
import { Quiz as QuizType } from '../types';

interface QuizProps {
  data: QuizType;
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ data, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (!hasSubmitted) {
      setSelectedOption(id);
    }
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    const isCorrect = data.options.find(o => o.id === selectedOption)?.isCorrect;
    if (isCorrect) {
      onComplete();
    }
  };

  const handleRetry = () => {
    setHasSubmitted(false);
    setSelectedOption(null);
  };

  const currentSelection = data.options.find(o => o.id === selectedOption);
  const isCorrect = currentSelection?.isCorrect;

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-blue-600 p-1.5 rounded-lg">
           <HelpCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">Knowledge Check</h3>
          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Verify your understanding</p>
        </div>
      </div>
      
      <div className="p-8">
        <p className="text-xl font-semibold text-slate-800 mb-8 leading-snug">{data.question}</p>
        
        <div className="space-y-4">
          {data.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={hasSubmitted}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 group relative ${
                selectedOption === option.id
                  ? hasSubmitted
                    ? option.isCorrect
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : 'border-red-500 bg-red-50/50'
                    : 'border-blue-500 bg-blue-50/30 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]'
                  : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className={`font-medium text-lg ${selectedOption === option.id ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-800'}`}>
                  {option.text}
                </span>
                {hasSubmitted && selectedOption === option.id && (
                  option.isCorrect 
                    ? <CheckCircle className="text-emerald-500 w-6 h-6" /> 
                    : <XCircle className="text-red-500 w-6 h-6" />
                )}
                {!hasSubmitted && selectedOption === option.id && (
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                )}
                {!hasSubmitted && selectedOption !== option.id && (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-blue-400"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {!hasSubmitted && (
          <div className="mt-8 flex justify-end">
            <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
                Check Answer
                <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {hasSubmitted && (
          <div className={`mt-8 p-6 rounded-xl animate-fadeIn ${isCorrect ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                </div>
                <div>
                    <p className={`font-bold text-lg mb-2 ${isCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
                    {isCorrect ? 'That is correct!' : 'Not quite right.'}
                    </p>
                    <p className="text-slate-700 leading-relaxed">{data.explanation}</p>
                    
                    {!isCorrect && (
                    <button 
                        onClick={handleRetry}
                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors shadow-sm"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                    </button>
                    )}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};