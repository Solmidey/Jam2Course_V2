
import React, { useState, useCallback } from 'react';
import { CourseOutline, CheckpointPlan, Quiz } from './types';
import { generateCourse } from './services/courseGenerator';
import Header from './components/Header';
import Footer from './components/Footer';
import CoursePreview from './components/CoursePreview';
import { LoadingSpinner, ErrorIcon } from './components/Icons';

type GeneratedCourse = {
  outline: CourseOutline;
  checkpoints: CheckpointPlan;
  quiz: Quiz;
};

const App: React.FC = () => {
  const [threadUrl, setThreadUrl] = useState<string>('https://nullshot.example/jam/example-thread');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<GeneratedCourse | null>(null);

  const handleGenerateCourse = useCallback(async () => {
    if (!threadUrl) {
      setError('Please enter a Jam thread URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setCourse(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const generatedData = generateCourse(threadUrl);
      setCourse(generatedData);
    } catch (e) {
      setError('Failed to generate the course. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [threadUrl]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Generate Your Micro-Course</h2>
            <p className="text-gray-600 mb-6">Enter a Nullshot Jam thread URL to instantly create a structured 60-minute course.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={threadUrl}
                onChange={(e) => setThreadUrl(e.target.value)}
                placeholder="https_//nullshot.example/jam/..."
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition-shadow duration-200"
                disabled={isLoading}
              />
              <button
                onClick={handleGenerateCourse}
                disabled={isLoading}
                className="bg-brand-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Generating...</span>
                  </>
                ) : (
                  'Generate Course'
                )}
              </button>
            </div>
          </div>

          <div className="mt-12">
            {isLoading && (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
                <p className="mt-4 text-lg text-gray-600 font-semibold">Crafting your course, please wait...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center gap-4" role="alert">
                <ErrorIcon />
                <div>
                  <p className="font-bold">An Error Occurred</p>
                  <p>{error}</p>
                </div>
              </div>
            )}
            {course && <CoursePreview course={course} />}
            {!isLoading && !error && !course && (
                <div className="text-center py-16 px-6 bg-brand-light rounded-2xl border-2 border-dashed border-brand-secondary">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">Ready to Start Learning?</h3>
                    <p className="text-brand-dark max-w-xl mx-auto">
                        Your generated course preview will appear here. Just paste a Jam URL above and click generate to see the magic happen!
                    </p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
