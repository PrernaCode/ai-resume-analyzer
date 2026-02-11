import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
    selectedFile?: File | null;
}

const FileUploader = ({ onFileSelect, selectedFile }: FileUploaderProps) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20 MB

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    const file = selectedFile !== undefined ? selectedFile : (acceptedFiles[0] || null);


    return (
        <div className='w-full'>
            <div {...getRootProps({ className: 'w-full' })}>
                <input {...getInputProps()} />
                <div className="w-full space-y-4 cursor-pointer flex flex-col items-center justify-center h-full min-h-[150px]">
                    {file ? (
                        <div className="uploader-selected-file w-full" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                <img src="/images/pdf.png" alt="pdf" className="w-10 h-10 object-contain flex-shrink-0" />
                                <div className="text-left min-w-0 flex-1">
                                    <p className="text-sm font-bold text-gray-900 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="p-2 ml-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-5 h-5 opacity-60 hover:opacity-100" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center ">
                            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4 text-indigo-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            </div>
                            <p className="text-lg font-bold text-gray-900 mb-1">
                                Click to upload
                                <span className="font-normal text-gray-500"> or drag and drop</span>
                            </p>
                            <p className="text-sm text-gray-400 font-medium">PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader
