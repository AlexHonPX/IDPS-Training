import React from 'react';
import { ContentBlock } from '../types';
import { Diagram } from './Diagram';
import { HackSimulation } from './HackSimulation';
import { AlertTriangle, Info, Check, PlayCircle, Square, CheckSquare } from 'lucide-react';

interface ModuleContentProps {
  blocks: ContentBlock[];
  onVideoComplete?: (url: string) => void;
  watchedVideos?: string[];
}

export const ModuleContent: React.FC<ModuleContentProps> = ({ blocks, onVideoComplete, watchedVideos = [] }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {blocks.map((block, index) => (
        <div key={index} className="space-y-4">
          {block.title && block.type !== 'alert' && block.type !== 'comparison' && block.type !== 'diagram' && block.type !== 'simulation' && block.type !== 'video' && (
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{block.title}</h3>
          )}

          {block.type === 'text' && (
            <p className="text-slate-600 leading-relaxed text-lg">
              {block.content}
            </p>
          )}

          {block.type === 'list' && (
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
               {block.title && <h4 className="text-lg font-bold text-slate-900 mb-6">{block.title}</h4>}
              <ul className="space-y-4">
                {(block.content as string[] || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-cyan-700" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {block.type === 'alert' && (
            <div className="flex gap-5 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl shadow-sm">
              <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 mb-2 uppercase tracking-wide text-sm">{block.title || "Critical Insight"}</h4>
                <p className="text-amber-800/90 font-medium">{block.content}</p>
              </div>
            </div>
          )}

          {block.type === 'diagram' && block.diagramNodes && (
            <div>
              {block.title && <h3 className="text-xl font-bold text-slate-800 mb-3">{block.title}</h3>}
              <p className="text-slate-600 mb-6">{block.content}</p>
              <Diagram nodes={block.diagramNodes} />
            </div>
          )}

          {block.type === 'simulation' && (
            <div>
              {block.title && <h3 className="text-xl font-bold text-slate-800 mb-3">{block.title}</h3>}
              <HackSimulation />
            </div>
          )}

          {block.type === 'video' && block.videoUrl && (
             <div className="mt-6">
                {block.title && (
                  <div className="flex items-center gap-3 mb-4">
                    <PlayCircle className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-800">{block.title}</h3>
                  </div>
                )}
                <div className="relative pt-[56.25%] w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-200 bg-slate-900 mb-4">
                  <iframe 
                    src={block.videoUrl} 
                    className="absolute top-0 left-0 w-full h-full" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    title={block.title || "Video content"}
                  ></iframe>
                </div>
                
                {/* Confirmation Button for Completion Tracking */}
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={() => onVideoComplete && onVideoComplete(block.videoUrl!)}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                            ${watchedVideos.includes(block.videoUrl) 
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default' 
                                : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'}
                        `}
                    >
                        {watchedVideos.includes(block.videoUrl) ? (
                            <>
                                <CheckSquare className="w-5 h-5" />
                                Video Watched
                            </>
                        ) : (
                            <>
                                <Square className="w-5 h-5" />
                                I have watched the video
                            </>
                        )}
                    </button>
                </div>

                {block.content && <p className="mt-4 text-slate-600 italic text-center">{block.content}</p>}
             </div>
          )}

          {block.type === 'comparison' && (
            <div className="space-y-6">
               {block.title && <h3 className="text-xl font-bold text-slate-800">{block.title}</h3>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side */}
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-[0_4px_20px_-10px_rgba(59,130,246,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                  <h4 className="text-blue-700 font-bold mb-4 text-lg">
                    {block.comparisonLeft?.title}
                  </h4>
                  <ul className="space-y-3">
                    {block.comparisonLeft?.points.map((p, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-blue-400 font-bold">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Right Side */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-slate-400"></div>
                  <h4 className="text-slate-800 font-bold mb-4 text-lg">
                    {block.comparisonRight?.title}
                  </h4>
                  <ul className="space-y-3">
                    {block.comparisonRight?.points.map((p, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                         <span className="text-slate-400 font-bold">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};