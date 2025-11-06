
import React from 'react';
import { CourseOutline, CheckpointPlan, Quiz } from '../types';
import ModuleCard from './ModuleCard';
import QuizSection from './QuizSection';

interface CoursePreviewProps {
  course: {
    outline: CourseOutline;
    checkpoints: CheckpointPlan;
    quiz: Quiz;
  };
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ course }) => {
  const { outline, checkpoints, quiz } = course;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Course Header */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <span className="text-sm font-semibold text-brand-secondary uppercase">Micro-Course</span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">{outline.title}</h1>
        <p className="text-lg text-gray-600 mb-6">A {outline.duration_minutes}-minute crash course to accelerate your learning.</p>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Learning Outcomes</h3>
          <ul className="space-y-2">
            {outline.learning_outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Modules & Checkpoints */}
      <div className="space-y-8">
        {outline.modules.map((module, index) => (
          <ModuleCard 
            key={module.id}
            module={module}
            moduleNumber={index + 1}
            checkpoints={checkpoints.checkpoints.filter(c => c.module_id === module.id)}
          />
        ))}
      </div>

      {/* Quiz Section */}
      <QuizSection quiz={quiz} />
    </div>
  );
};

export default CoursePreview;
