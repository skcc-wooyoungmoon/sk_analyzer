
import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
    return (
        <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
            <div className="container mx-auto px-4 lg:px-6 h-20 flex items-center">
                <div className="flex items-center gap-3">
                    <LogoIcon />
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        AI System Analyzer
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
