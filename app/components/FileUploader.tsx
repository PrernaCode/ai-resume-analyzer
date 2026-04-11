import { useCallback } from "react"
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

    const maxFileSize = 5 * 1024 * 1024; // 5 MB

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
                <div className="w-full space-y-4 cursor-pointer flex flex-col items-center justify-center h-full min-h-[220px]">
                    {file ? (
                        <div className="w-full p-8 bg-[#0B1120]/50 rounded-xl flex flex-col items-center justify-center border border-white/10 relative group/file" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="relative">
                                    <img src="/images/pdf.png" alt="pdf" className="w-16 h-16 object-contain" />
                                    <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 shadow-lg">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-white max-w-[300px] truncate px-4">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-slate-500 font-medium">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="mt-6 flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all text-sm font-bold border border-red-500/20"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4 invert opacity-80" />
                                Remove File
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center w-full py-8">
                            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold text-white">
                                    Click to upload <span className="text-slate-400 font-medium">or drag and drop</span>
                                </p>
                                <p className="text-base text-slate-500 font-medium uppercase tracking-wider">PDF format only (Max 2 pages, 5MB)</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader
