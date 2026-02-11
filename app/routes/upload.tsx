import { useEffect, useState, type FormEvent } from 'react'
import Navbar from '~/components/Navbar'
import FileUploader from '../components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '~/lib/pdfToImage';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from '../../constants/index';


const upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ companyName?: string, jobTitle?: string, jobDescription?: string, file?: string }>({});

    const handleFileSelect = (file: File | null) => {
        setFile(file);
        if (file) {
            setErrors(prev => ({ ...prev, file: undefined }));
        }
    }

    //after uploading resume, this function will handle analysis
    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);
        setStatusText('Uploading resume...');
        const uploadedFile = await fs.upload([file]);

        if (!uploadedFile) return setStatusText('Error uploading file.');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText('Error converting PDF to image.');

        setStatusText('uploading image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Error uploading image.');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analyzing resume...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })

        );

        if (!feedback) return setStatusText('Error: Failed to analyze resume.');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete!');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        const newErrors: typeof errors = {};
        if (!companyName.trim()) newErrors.companyName = "Company Name is required";
        if (!jobTitle.trim()) newErrors.jobTitle = "Job Title is required";
        if (!jobDescription.trim()) newErrors.jobDescription = "Job Description is required";
        if (!file) newErrors.file = "Please upload a resume file";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file: file! });
    }

    return (
        <main className="min-h-screen bg-aurora relative overflow-hidden font-['Mona Sans']">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <section className="flex flex-col items-center gap-10">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                            Smart feedback for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">dream job</span>
                        </h1>
                        {!isProcessing && (
                            <p className="text-lg text-gray-600 max-w-xl mx-auto">
                                Drop your resume for an ATS score and improvement suggestions.
                            </p>
                        )}
                    </div>

                    {isProcessing ? (
                        <div className="glass-card p-12 rounded-3xl w-full max-w-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                                <img src="/images/resume-scan-2.gif" className="w-[120px] relative z-10 rounded-2xl shadow-sm" alt="Scanning..." />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{statusText}</h2>
                            <p className="text-gray-500">This might take a few seconds...</p>
                        </div>
                    ) : (
                        <div className="glass-card p-8 md:p-10 rounded-[2rem] w-full max-w-2xl shadow-xl relative overflow-hidden">
                            {/* Decorative gradient blob */}
                            <div className="absolute -top-[20%] -right-[20%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-3xl pointer-events-none"></div>

                            <form id="upload-form" onSubmit={handleSubmit} className='flex flex-col gap-6 relative z-10' noValidate>
                                <div className="space-y-2 w-full">
                                    <label htmlFor="company-name" className="text-sm font-semibold text-gray-700 ml-1">Company Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="company-name"
                                            placeholder="e.g. Google, Amazon"
                                            id="company-name"
                                            className={`w-full block px-5 py-4 bg-gray-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-900 placeholder:text-gray-400 ${errors.companyName ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-500'}`}
                                            onChange={() => setErrors(prev => ({ ...prev, companyName: undefined }))}
                                        />
                                        {errors.companyName && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.companyName}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2 w-full">
                                    <label htmlFor="job-title" className="text-sm font-semibold text-gray-700 ml-1">Job Title</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="job-title"
                                            placeholder="e.g. Senior Frontend Engineer"
                                            id="job-title"
                                            className={`w-full block px-5 py-4 bg-gray-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-900 placeholder:text-gray-400 ${errors.jobTitle ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-500'}`}
                                            onChange={() => setErrors(prev => ({ ...prev, jobTitle: undefined }))}
                                        />
                                        {errors.jobTitle && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.jobTitle}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2 w-full">
                                    <label htmlFor="job-description" className="text-sm font-semibold text-gray-700 ml-1">Job Description</label>
                                    <div className="relative">
                                        <textarea
                                            rows={5}
                                            name="job-description"
                                            placeholder="Paste the job description here..."
                                            id="job-description"
                                            className={`w-full block px-5 py-4 bg-gray-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-900 placeholder:text-gray-400 resize-none ${errors.jobDescription ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-500'}`}
                                            onChange={() => setErrors(prev => ({ ...prev, jobDescription: undefined }))}
                                        />
                                        {errors.jobDescription && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.jobDescription}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2 w-full">
                                    <label htmlFor="uploader" className="text-sm font-semibold text-gray-700 ml-1">Upload Resume</label>
                                    <div className={`w-full border-2 border-dashed rounded-2xl transition-colors bg-white/50 ${errors.file ? 'border-red-300 hover:border-red-400' : 'border-indigo-100 hover:border-indigo-300'}`}>
                                        <FileUploader onFileSelect={handleFileSelect} selectedFile={file} />
                                    </div>
                                    {errors.file && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.file}</p>}
                                </div>

                                <button
                                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-2"
                                    type="submit"
                                >
                                    Analyze Resume
                                </button>
                            </form>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default upload
