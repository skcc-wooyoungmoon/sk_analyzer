
import React, { useRef, useState, useCallback } from 'react';
import { FolderUploadIcon } from './Icons';
import type { FileData } from '../types';

interface FolderInputProps {
    onFolderSelect: (files: FileData[] | null) => void;
    disabled: boolean;
}

const FolderInput: React.FC<FolderInputProps> = ({ onFolderSelect, disabled }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [folderInfo, setFolderInfo] = useState<string | null>(null);
    const [isReading, setIsReading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            onFolderSelect(null);
            setFolderInfo(null);
            return;
        }

        setIsReading(true);
        setError(null);
        setFolderInfo(`Reading ${files.length} files...`);

        const readFile = (file: File): Promise<FileData> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target?.result as string;
                    resolve({ path: (file as any).webkitRelativePath, content });
                };
                reader.onerror = (e) => {
                    console.error("Error reading file:", file.name, e);
                    reject(new Error(`Could not read file ${file.name}`));
                };
                reader.readAsText(file);
            });
        };

        try {
            const fileDataPromises = Array.from(files).map(readFile);
            const allFileData = await Promise.all(fileDataPromises);
            onFolderSelect(allFileData);
            const folderName = allFileData[0]?.path.split('/')[0] || 'folder';
            setFolderInfo(`'${folderName}' (${allFileData.length} files)`);
        } catch (err) {
            setError('Error reading folder contents.');
            onFolderSelect(null);
            setFolderInfo(null);
            console.error(err);
        } finally {
            setIsReading(false);
            // Reset input value to allow re-selecting the same folder
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }, [onFolderSelect]);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
                // @ts-ignore
                webkitdirectory=""
                directory=""
                multiple
            />
            <button
                onClick={handleButtonClick}
                disabled={disabled || isReading}
                className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-300 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
                <FolderUploadIcon />
                <span>로컬 폴더 선택</span>
            </button>
            {folderInfo && <p className="text-xs text-slate-400 mt-2 text-center">{folderInfo}</p>}
            {error && <p className="text-xs text-red-400 mt-2 text-center">{error}</p>}
        </div>
    );
};

export default FolderInput;
