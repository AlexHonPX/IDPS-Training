import React from 'react';
import { ArrowRight, Shield, Activity, Server, AlertTriangle, Radio, Globe } from 'lucide-react';
import { DiagramNode } from '../types';

interface DiagramProps {
  nodes: DiagramNode[];
}

export const Diagram: React.FC<DiagramProps> = ({ nodes }) => {
  const getIcon = (type: DiagramNode['type']) => {
    switch (type) {
      case 'component': return <Server className="w-6 h-6 text-slate-700" />;
      case 'network': return <Activity className="w-6 h-6 text-cyan-600" />;
      case 'action': return <Shield className="w-6 h-6 text-emerald-600" />;
      case 'threat': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      default: return <Globe className="w-6 h-6 text-slate-500" />;
    }
  };

  const getStyles = (type: DiagramNode['type']) => {
    switch (type) {
      case 'component': return 'border-slate-300 bg-white shadow-sm';
      case 'network': return 'border-cyan-200 bg-cyan-50 shadow-cyan-100';
      case 'action': return 'border-emerald-200 bg-emerald-50 shadow-emerald-100';
      case 'threat': return 'border-red-200 bg-red-50 shadow-red-100';
      default: return 'border-slate-200';
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200 my-8 overflow-x-auto">
      {nodes.map((node, index) => (
        <React.Fragment key={index}>
          <div className={`relative flex flex-col items-center p-5 rounded-xl border-2 w-48 text-center transition-transform hover:-translate-y-1 ${getStyles(node.type)}`}>
            <div className="mb-3 p-2.5 rounded-full bg-white/80 shadow-sm border border-slate-100">
              {getIcon(node.type)}
            </div>
            <h4 className="font-bold text-sm text-slate-800 mb-2 uppercase tracking-wide">{node.label}</h4>
            {node.description && (
              <p className="text-xs text-slate-600 leading-normal">{node.description}</p>
            )}
            
            {/* Connector Dot */}
            <div className="absolute -right-3 top-1/2 w-2 h-2 rounded-full bg-slate-300 hidden md:block opacity-0"></div>
          </div>
          
          {index < nodes.length - 1 && (
            <div className="hidden md:flex text-slate-300">
              <ArrowRight className="w-6 h-6" />
            </div>
          )}
          {/* Mobile Down Arrow */}
          {index < nodes.length - 1 && (
            <div className="md:hidden text-slate-300 transform rotate-90 my-[-10px]">
              <ArrowRight className="w-6 h-6" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};