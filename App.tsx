
import React, { useState, useCallback } from 'react';
import type { AnalysisType } from './types';
import { ANALYSIS_OPTIONS } from './constants';
import { analyzeSystem } from './services/geminiService';
import Header from './components/Header';
import AnalysisSelector from './components/AnalysisSelector';
import CodeInput from './components/CodeInput';
import ResultDisplay from './components/ResultDisplay';
import { AnalyzeIcon, GithubIcon } from './components/Icons';

const App: React.FC = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [githubUrl, setGithubUrl] = useState<string>('');
    const [selectedAnalyses, setSelectedAnalyses] = useState<Set<AnalysisType>>(new Set(ANALYSIS_OPTIONS.map(opt => opt.id)));
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalysisToggle = (analysisType: AnalysisType) => {
        setSelectedAnalyses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(analysisType)) {
                newSet.delete(analysisType);
            } else {
                newSet.add(analysisType);
            }
            return newSet;
        });
    };

    const handleAnalyzeClick = useCallback(async () => {
        if ((!userInput.trim() && !githubUrl.trim()) || selectedAnalyses.size === 0) {
            setError('분석할 코드, 설명, 또는 GitHub URL을 입력하고, 하나 이상의 분석 유형을 선택해주세요.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysisResult('');

        try {
            const result = await analyzeSystem(userInput, Array.from(selectedAnalyses), githubUrl);
            setAnalysisResult(result);
        } catch (e) {
            console.error(e);
            setError('분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    }, [userInput, githubUrl, selectedAnalyses]);


    return (
        <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-80px)]">
                {/* Input Section */}
                <div className="flex flex-col gap-4 bg-slate-800/50 rounded-lg p-4 lg:p-6 overflow-hidden border border-slate-700">
                    <h2 className="text-xl font-bold text-cyan-400">1. 분석 대상 입력</h2>
                    
                    <div className="relative">
                        <label htmlFor="github-url" className="sr-only">GitHub Repository URL</label>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <GithubIcon />
                        </div>
                        <input
                            type="text"
                            id="github-url"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            placeholder="GitHub Repository URL (Optional)"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pl-10 text-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                        />
                    </div>

                    <CodeInput value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                    
                    <h2 className="text-xl font-bold text-cyan-400 mt-2">2. 분석 항목 선택</h2>
                    <AnalysisSelector selectedAnalyses={selectedAnalyses} onToggle={handleAnalysisToggle} />
                    
                    <button
                        onClick={handleAnalyzeClick}
                        disabled={isLoading || (!userInput.trim() && !githubUrl.trim()) || selectedAnalyses.size === 0}
                        className="mt-auto w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                분석 중...
                            </>
                        ) : (
                            <>
                                <AnalyzeIcon />
                                시스템 분석 실행
                            </>
                        )}
                    </button>
                </div>

                {/* Output Section */}
                <div className="flex flex-col bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
                    <ResultDisplay result={analysisResult} isLoading={isLoading} error={error} />
                </div>
            </main>
        </div>
    );
};

export default App;
