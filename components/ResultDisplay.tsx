import React from 'react';
import TurndownService from 'turndown';
import { ResultIcon, ErrorIcon, HtmlIcon, MarkdownIcon } from './Icons';
import Loader from './Loader';

interface ResultDisplayProps {
    result: string;
    isLoading: boolean;
    error: string | null;
}

const WelcomeMessage: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 text-slate-500">
        <ResultIcon />
        <h3 className="mt-4 text-xl font-semibold text-slate-400">분석 결과를 기다리는 중</h3>
        <p className="mt-2 max-w-sm">
            좌측에 분석할 시스템의 정보를 입력하고 '시스템 분석 실행' 버튼을 클릭하면 AI가 생성한 분석 리포트가 여기에 표시됩니다.
        </p>
    </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
     <div className="flex flex-col items-center justify-center h-full text-center p-8 text-red-400">
        <ErrorIcon />
        <h3 className="mt-4 text-xl font-semibold">오류 발생</h3>
        <p className="mt-2 max-w-sm text-red-300">{message}</p>
    </div>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, error }) => {
    
    const handleDownload = (content: string, fileName: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDownloadHtml = () => {
        if (!result) return;
        handleDownload(result, 'analysis-report.html', 'text/html;charset=utf-8');
    };

    const handleDownloadMd = () => {
        if (!result) return;
        const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
        const markdown = turndownService.turndown(result);
        handleDownload(markdown, 'analysis-report.md', 'text/markdown;charset=utf-8');
    };

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }
        if (error) {
            return <ErrorMessage message={error} />;
        }
        if (result) {
            return (
                <div
                    className="prose prose-lg prose-invert prose-slate max-w-full p-6 lg:p-8 text-slate-200 
                               prose-headings:text-cyan-400 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                               prose-strong:text-slate-100 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                               prose-blockquote:border-l-cyan-500 prose-blockquote:text-slate-300
                               prose-code:bg-slate-700 prose-code:text-amber-400 prose-code:rounded prose-code:px-1.5 prose-code:py-1 prose-code:font-mono prose-code:text-sm
                               prose-pre:bg-slate-900/70 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-lg prose-pre:p-4 prose-pre:text-base
                               prose-table:border-collapse prose-th:border prose-th:border-slate-600 prose-th:p-2 prose-th:bg-slate-700 prose-th:text-slate-200
                               prose-td:border prose-td:border-slate-700 prose-td:p-2"
                    dangerouslySetInnerHTML={{ __html: result }}
                />
            );
        }
        return <WelcomeMessage />;
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-200">AI 분석 리포트</h2>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleDownloadHtml}
                        disabled={!result || isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 rounded-md text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Download as HTML"
                    >
                       <HtmlIcon />
                       <span>HTML</span>
                    </button>
                    <button 
                        onClick={handleDownloadMd}
                        disabled={!result || isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 rounded-md text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Download as Markdown"
                    >
                        <MarkdownIcon />
                        <span>Markdown</span>
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default ResultDisplay;