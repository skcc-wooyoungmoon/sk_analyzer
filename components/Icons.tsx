import React from 'react';

export const LogoIcon: React.FC = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400">
        <path d="M14 20.8159C13.4837 20.9348 12.9463 21 12.3995 21C7.81741 21 4.04163 17.2721 4.04163 12.75C4.04163 8.22791 7.81741 4.5 12.3995 4.5C13.8829 4.5 15.2647 4.88124 16.4428 5.5414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.1576 20.8159C10.6739 20.9348 11.2113 21 11.758 21C16.3401 21 20.1159 17.2721 20.1159 12.75C20.1159 10.3344 19.1234 8.16972 17.5197 6.5824" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.3984 4.5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4.04102 12.75H2.29102" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12.3984 21V22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.71875 6.75L6.65796 5.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.71875 18.75L6.65796 19.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export const AnalyzeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);


export const ResultIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
);

export const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

export const GithubIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

export const MarkdownIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.61 3H3.39C2.62 3 2 3.62 2 4.39V19.61C2 20.38 2.62 21 3.39 21H20.61C21.38 21 22 20.38 22 19.61V4.39C22 3.62 21.38 3 20.61 3ZM9.75 16H8.25V9.38L6.38 10.38V8.88L9.5 7.13V16H9.75ZM17.25 12.75L14.75 16H13V8H14.5V12.75L17.25 8H18.75L16 12L19 16H17.25Z"></path>
    </svg>
);

export const HtmlIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18l6-6-6-6-1.41 1.41L19.17 12l-4.58 4.59L16 18zM8 6l-6 6 6 6 1.41-1.41L4.83 12l4.58-4.59L8 6z"/>
    </svg>
);