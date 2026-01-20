import React, { useState, useEffect } from 'react';
import { courseData } from './data/courseContent';
import { ModuleContent } from './components/ModuleContent';
import { Quiz } from './components/Quiz';
import { ProgressBar } from './components/ui/ProgressBar';
import { Shield, ChevronRight, ChevronLeft, Menu, X, BookOpen, Award, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  // Track completed quizzes by module ID
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  // Track watched videos by URL
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentModule = courseData.modules[currentModuleIndex];
  const isLastModule = currentModuleIndex === courseData.modules.length - 1;
  
  // Identify videos in the current module
  const currentModuleVideos = currentModule.sections
    .filter(s => s.type === 'video' && s.videoUrl)
    .map(s => s.videoUrl!);
  
  const areAllVideosWatched = currentModuleVideos.every(url => watchedVideos.includes(url));

  // Scroll to top on module change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentModuleIndex]);

  const handleNext = () => {
    if (!completedModules.includes(currentModule.id)) {
      setCompletedModules(prev => [...prev, currentModule.id]);
    }

    if (isLastModule) {
      setShowCertificate(true);
    } else {
      setCurrentModuleIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setShowCertificate(false);
    setCurrentModuleIndex(prev => Math.max(0, prev - 1));
  };

  const handleVideoComplete = (url: string) => {
    if (!watchedVideos.includes(url)) {
      setWatchedVideos(prev => [...prev, url]);
    }
  };

  // Logic to determine if user can proceed
  const isQuizPassed = !currentModule.quiz || completedQuizIds.includes(currentModule.id);
  const canProceed = (isQuizPassed && areAllVideosWatched) || completedModules.includes(currentModule.id);

  if (showCertificate) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white p-12 rounded-2xl shadow-2xl text-center border border-slate-100">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
            <Award className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Certificate of Completion</h1>
          <p className="text-slate-500 mb-8">This certifies that you have successfully completed the</p>
          
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-4">
            {courseData.title}
          </h2>
          <p className="text-slate-600 mb-8 font-medium">Training provided by {courseData.author}</p>
          
          <div className="w-full h-px bg-slate-200 mb-8"></div>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => {
                setShowCertificate(false);
                setCurrentModuleIndex(0);
                setCompletedModules([]);
                setCompletedQuizIds([]);
                setWatchedVideos([]);
              }}
              className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Restart Course
            </button>
            <button 
              onClick={() => window.print()}
              className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Print Certificate
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0B1121] text-white p-4 flex items-center justify-between sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-1.5 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">PlaxidityX</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-300">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 h-screen w-80 bg-[#0B1121] text-white z-10 transition-transform duration-300 ease-in-out flex flex-col shadow-xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">PlaxidityX</span>
          </div>
          <p className="text-xs text-cyan-400 font-semibold tracking-wider uppercase ml-1">Academy</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {courseData.modules.map((module, index) => {
            const isActive = index === currentModuleIndex;
            const isCompleted = completedModules.includes(module.id);
            const isLocked = index > 0 && !completedModules.includes(courseData.modules[index - 1].id) && index !== currentModuleIndex;

            return (
              <button
                key={module.id}
                onClick={() => {
                  if (!isLocked) {
                    setCurrentModuleIndex(index);
                    setIsSidebarOpen(false);
                  }
                }}
                disabled={isLocked}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200 text-sm group
                  ${isActive 
                    ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-white shadow-inner' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}
                  ${isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold transition-colors
                  ${isActive 
                    ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-md' 
                    : isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                      : 'bg-slate-800 text-slate-500 border border-slate-700'}
                `}>
                  {isCompleted ? <Zap className="w-3 h-3" /> : index + 1}
                </div>
                <div className="flex-1">
                  <span className={`block font-medium truncate ${isActive ? 'text-cyan-100' : ''}`}>{module.shortTitle}</span>
                  <span className="text-xs opacity-60">{module.duration}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-[#060a15]">
          <div className="flex items-center gap-4">
             <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
               <BookOpen className="w-4 h-4 text-cyan-400" />
             </div>
             <div>
               <p className="text-sm font-medium text-slate-200">IDPS Masterclass</p>
               <p className="text-xs text-slate-500">v2.4.0 • Enterprise</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 lg:p-12 pb-28">
        
        {/* Breadcrumb / Progress */}
        <div className="mb-10">
           <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 uppercase tracking-wider mb-3">
              <span className="px-2 py-1 bg-cyan-50 rounded border border-cyan-100">Module {currentModuleIndex + 1}</span>
              <span className="text-slate-400">/</span>
              <span>{courseData.modules.length}</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{currentModule.title}</h1>
           <ProgressBar current={currentModuleIndex} total={courseData.modules.length} />
        </div>

        {/* Content Container - keyed by module ID to ensure full re-render */}
        <div 
          key={currentModule.id} 
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 animate-fadeIn"
        >
          <ModuleContent 
            blocks={currentModule.sections} 
            onVideoComplete={handleVideoComplete}
            watchedVideos={watchedVideos}
          />
          
          {currentModule.quiz && (
            <Quiz 
              data={currentModule.quiz} 
              onComplete={() => {
                if (!completedQuizIds.includes(currentModule.id)) {
                  setCompletedQuizIds(prev => [...prev, currentModule.id]);
                }
              }} 
            />
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="fixed bottom-0 left-0 md:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 px-8 flex justify-between items-center z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button
            onClick={handlePrev}
            disabled={currentModuleIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 text-slate-600 font-medium hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="hidden md:flex flex-col items-end">
             <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Up Next</span>
             <span className="text-sm text-slate-700 font-medium">
                {isLastModule ? 'Finish Course' : courseData.modules[currentModuleIndex + 1]?.shortTitle}
             </span>
          </div>

          <div className="relative group">
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all
                ${canProceed 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-blue-300 hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}
              `}
            >
              {isLastModule ? 'Finish Course' : 'Next Module'}
              <ChevronRight className="w-5 h-5" />
            </button>
            {!canProceed && !areAllVideosWatched && currentModuleVideos.length > 0 && (
              <div className="absolute bottom-full mb-2 right-0 bg-slate-800 text-white text-xs px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Please watch the video to proceed
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;