
import React, { useState } from 'react';
import { Quiz } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface QuizSectionProps {
  quiz: Quiz;
}

const QuizQuestion: React.FC<{ question: Quiz['questions'][0]; questionNumber: number }> = ({ question, questionNumber }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const getOptionClasses = (index: number) => {
    if (!isAnswered) {
      return 'border-gray-300 hover:border-brand-secondary hover:bg-brand-light cursor-pointer';
    }
    if (index === question.correct_index) {
      return 'bg-green-100 border-green-400 text-green-800 font-semibold';
    }
    if (index === selectedOption) {
      return 'bg-red-100 border-red-400 text-red-800';
    }
    return 'border-gray-300 text-gray-500';
  };

  return (
    <div className="py-6 border-b border-gray-200 last:border-b-0">
      <p className="font-semibold text-lg text-gray-800 mb-4">
        <span className="font-bold mr-2">{questionNumber}.</span> {question.prompt}
      </p>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(index)}
            className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-200 ${getOptionClasses(index)}`}
          >
            <span>{option}</span>
            {isAnswered && index === question.correct_index && <CheckCircleIcon />}
            {isAnswered && index === selectedOption && index !== question.correct_index && <XCircleIcon />}
          </div>
        ))}
      </div>
      {isAnswered && question.rationale && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
          <span className="font-semibold">Rationale:</span> {question.rationale}
        </div>
      )}
    </div>
  );
};


const QuizSection: React.FC<QuizSectionProps> = ({ quiz }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-1">Knowledge Check</h2>
      <p className="text-gray-600 mb-6">Test your understanding of the material with this short quiz.</p>
      
      <div>
        {quiz.questions.map((q, index) => (
          <QuizQuestion key={q.id} question={q} questionNumber={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default QuizSection;
