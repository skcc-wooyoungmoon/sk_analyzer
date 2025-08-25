
import React from 'react';

interface CodeInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder="분석할 코드, 파일 목록, 또는 시스템 설명을 여기에 붙여넣으세요..."
            className="w-full flex-grow bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none transition-colors"
        />
    );
};

export default CodeInput;
