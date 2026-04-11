import { useEffect, useState, type FormEvent } from 'react'
import Navbar from '~/components/Navbar'
import FileUploader from '../components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate, Link } from 'react-router';
import { convertPdfToImage, getPdfMetadata } from '~/lib/pdfToImage';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from '../../constants/index';
import { validateCompanyName, validateJobTitle, validateJobDescription } from '~/lib/validation';


const upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate('/auth?next=/upload');
        }
    }, [auth.isAuthenticated, isLoading, navigate]);

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
        setStatusText('Checking resume...');
        
        const meta = await getPdfMetadata(file);
        if ('error' in meta) {
            setIsProcessing(false);
            return setStatusText(meta.error);
        }
        if (meta.pageCount > 2) {
            setIsProcessing(false);
            return setStatusText('Error: Resume exceeds 2-page limit. Please upload a shorter resume.');
        }

        setStatusText('Uploading resume...');
        const uploadedFile = await fs.upload([file]);

        if (!uploadedFile) return setStatusText('Error uploading file.');

        setStatusText('Converting to images...');
        // 1. Generate Full Quality Images (PNG) - Max 2 pages
        const fullResults = await convertPdfToImage(file, { scale: 4, format: 'image/png', maxPages: 2 });
        if (fullResults.error || fullResults.images.length === 0) return setStatusText('Error converting to preview images.');

        // 2. Generate Thumbnail (JPEG) - Only first page for dashboard
        const thumbResults = await convertPdfToImage(file, { scale: 1, format: 'image/jpeg', quality: 0.7, maxPages: 1 });
        if (thumbResults.error || thumbResults.images.length === 0) return setStatusText('Error converting to thumbnail.');

        setStatusText('Uploading previews...');
        const fullImageFiles = fullResults.images.map(img => img.file).filter((f): f is File => f !== null);
        const uploadedFullImages = await Promise.all(fullImageFiles.map(f => fs.upload([f])));
        
        const thumbFile = thumbResults.images[0].file;
        const uploadedThumb = await fs.upload([thumbFile!]);

        if (uploadedFullImages.some(img => !img) || !uploadedThumb) return setStatusText('Error uploading images.');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePaths: uploadedFullImages.map(img => img!.path),
            thumbnailPath: uploadedThumb.path,
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

        // Use new validation rules
        const companyRes = validateCompanyName(companyName);
        if (!companyRes.isValid) newErrors.companyName = companyRes.message;

        const titleRes = validateJobTitle(jobTitle);
        if (!titleRes.isValid) newErrors.jobTitle = titleRes.message;

        const descRes = validateJobDescription(jobDescription);
        if (!descRes.isValid) {
            newErrors.jobDescription = descRes.message;
        }

        if (!file) newErrors.file = "Please upload a resume file";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        // Proceed with sanitized description
        handleAnalyze({ 
            companyName: companyName.trim(), 
            jobTitle: jobTitle.trim(), 
            jobDescription: descRes.sanitized || jobDescription.trim(), 
            file: file! 
        });
    }

    return (
        <main className="min-h-screen bg-[#0B1120] text-white font-['Mona Sans'] selection:bg-blue-500/30">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <section className="flex flex-col items-center gap-12">
                    <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl md:text-5xl font-black !text-white tracking-tight leading-tight">
                            Smart feedback for your <span className="text-blue-500">dream job</span>
                        </h1>
                        {!isProcessing && (
                            <p className="text-lg text-slate-400 max-w-xl mx-auto">
                                Drop your resume for an ATS score and improvement suggestions.
                            </p>
                        )}
                    </div>

                    {isProcessing ? (
                        <div className="bg-[#1a2333]/60 backdrop-blur-2xl p-12 rounded-[2.5rem] w-full max-w-2xl flex flex-col items-center text-center border border-white/5 animate-in fade-in zoom-in-95 duration-500">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                                <img src="/images/resume-scan-2.gif" className="w-[120px] relative z-10 rounded-2xl shadow-2xl border border-white/10" alt="Scanning..." />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">{statusText}</h2>
                            <p className="text-slate-400 font-medium tracking-wide animate-pulse">Processing your application...</p>
                        </div>
                    ) : (
                        <div className="bg-[#1e293b]/60 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] w-full max-w-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
                            {/* Decorative glow */}
                            <div className="absolute -top-[20%] -right-[20%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>

                            <form id="upload-form" onSubmit={handleSubmit} className='flex flex-col gap-6 relative z-10 w-full' noValidate>
                                <div className="space-y-2 w-full">
                                    <label htmlFor="company-name" className="text-sm font-bold !text-white block ml-1">Company Name</label>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            name="company-name"
                                            placeholder="e.g. Google, Amazon"
                                            id="company-name"
                                            className={`w-full block px-5 py-4 bg-[#0B1120]/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-bold text-black placeholder:text-slate-600 ${errors.companyName ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/5 focus:ring-blue-500/20 focus:border-blue-500/50'}`}
                                            onChange={() => setErrors(prev => ({ ...prev, companyName: undefined }))}
                                        />
                                        {errors.companyName && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-black uppercase tracking-wider">{errors.companyName}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2 w-full">
                                    <label htmlFor="job-title" className="text-sm font-bold !text-white block ml-1">Job Title</label>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            name="job-title"
                                            placeholder="e.g. Senior Frontend Engineer"
                                            id="job-title"
                                            className={`w-full block px-5 py-4 bg-[#0B1120]/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-bold text-black placeholder:text-slate-600 ${errors.jobTitle ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/5 focus:ring-blue-500/20 focus:border-blue-500/50'}`}
                                            onChange={() => setErrors(prev => ({ ...prev, jobTitle: undefined }))}
                                        />
                                        {errors.jobTitle && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-black uppercase tracking-wider">{errors.jobTitle}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2 w-full">
                                    <div className="flex justify-between items-center ml-1 w-full">
                                        <label htmlFor="job-description" className="text-sm font-bold !text-white">Target Job Description</label>
                                        <span className="text-xs text-slate-500">(Recommended)</span>
                                    </div>
                                    <div className="relative w-full">
                                        <textarea
                                            rows={4}
                                            name="job-description"
                                            placeholder="Paste the job requirements here for a better match score..."
                                            id="job-description"
                                            className={`w-full block px-5 py-4 bg-[#0B1120]/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-bold text-black placeholder:text-slate-600 resize-none ${errors.jobDescription ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/5 focus:ring-blue-500/20 focus:border-blue-500/50'}`}
                                            onChange={() => setErrors(prev => ({ ...prev, jobDescription: undefined }))}
                                        />
                                        <div className="absolute bottom-3 right-4 text-[10px] font-black text-slate-600 uppercase tracking-widest pointer-events-none">
                                            ATS Optimized
                                        </div>
                                        {errors.jobDescription && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-black uppercase tracking-wider">{errors.jobDescription}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2 w-full">
                                    <div className={`w-full border-2 border-dashed rounded-2xl transition-all duration-300 bg-[#0B1120]/30 hover:bg-[#0B1120]/50 ${errors.file ? 'border-red-500/30 hover:border-red-500' : 'border-white/5 hover:border-blue-500/50'}`}>
                                        <FileUploader onFileSelect={handleFileSelect} selectedFile={file} />
                                    </div>
                                    {errors.file && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-black uppercase tracking-wider">{errors.file}</p>}
                                </div>

                                <div className="space-y-4 w-full pt-4">
                                    <button
                                        className="w-full py-5 px-6 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                                        type="submit"
                                    >
                                        Start Analysis
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                        </svg>
                                    </button>

                                    <Link
                                        to="/"
                                        className="block w-full text-center text-slate-400 hover:text-white transition-colors font-bold py-2"
                                    >
                                        Cancel and go back
                                    </Link>
                                </div>
                            </form>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default upload
