
import React from 'react';
import type { AnalysisType } from '../types';
import { ANALYSIS_OPTIONS } from '../constants';

interface AnalysisSelectorProps {
    selectedAnalyses: Set<AnalysisType>;
    onToggle: (analysisType: AnalysisType) => void;
}

const AnalysisSelector: React.FC<AnalysisSelectorProps> = ({ selectedAnalyses, onToggle }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 overflow-y-auto pr-2 -mr-2">
            {ANALYSIS_OPTIONS.map((option) => (
                <div
                    key={option.id}
                    onClick={() => onToggle(option.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                        selectedAnalyses.has(option.id)
                            ? 'bg-cyan-500/20 border-cyan-500'
                            : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                    }`}
                >
                    <label htmlFor={option.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            id={option.id}
                            checked={selectedAnalyses.has(option.id)}
                            onChange={() => onToggle(option.id)}
                            className="hidden"
                        />
                         <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                             selectedAnalyses.has(option.id) ? 'border-cyan-400 bg-cyan-500' : 'border-slate-500 bg-slate-800'
                         }`}>
                             {selectedAnalyses.has(option.id) && <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
                         </div>
                        <span className="text-sm font-medium text-slate-200 select-none">{option.label}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default AnalysisSelector;
