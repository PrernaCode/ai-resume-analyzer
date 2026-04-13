import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import Details from "~/components/Details";
import ATS from "~/components/ATS";
import Navbar from "~/components/Navbar";


export const meta = () => [
    { title: 'Resume Analysis Review | ResumeIQ' },
    { name: 'description', content: 'Detailed AI-powered analysis of your resume, including ATS scoring and improvement suggestions.' },
    { property: "og:title", content: "Resume Analysis Review | ResumeIQ" },
    { property: "og:description", content: "Check out my resume analysis on ResumeIQ." },
];

const resume = () => {
    const { kv, auth, isLoading, fs } = usePuterStore();
    const { id } = useParams();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading]);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;


            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imagePaths = data.imagePaths || [data.imagePath];
            if (imagePaths && imagePaths.length > 0) {
                const blobs = await Promise.all(imagePaths.map((path: string) => fs.read(path)));
                const urls = blobs.map(blob => blob ? URL.createObjectURL(blob) : '').filter(url => url !== '');
                setImageUrls(urls);
            }

            setFeedback(data.feedback);
        }

        loadResume();
    }, [id]);

    return (
        <main className="min-h-screen bg-[#0B1120] text-white font-['Mona Sans'] pt-20 flex flex-col selection:bg-blue-500/30">
            <Navbar />

            <div className="flex flex-row w-full max-lg:flex-col-reverse flex-grow relative">
                {/* Left Panel: Resume Preview */}
                <section className="feedback-section bg-[#0B1120] h-[calc(100vh-5rem)] sticky top-20 hidden lg:block border-r border-white/5 overflow-y-auto no-scrollbar">
                    {imageUrls.length > 0 && resumeUrl && (
                        <div className="w-full min-h-full p-4 flex flex-col items-center justify-start gap-8">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="animate-in fade-in zoom-in-95 duration-700 bg-[#1a2333] p-1.5 shadow-2xl rounded-2xl w-full max-w-2xl border border-white/10 group">
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full overflow-hidden rounded-xl">
                                        <img
                                            src={url}
                                            className="w-full h-auto object-contain cursor-zoom-in transition-transform duration-700 group-hover:scale-[1.02]"
                                            title={`Click to Open PDF (Page ${index + 1})`}
                                            alt={`Resume Preview Page ${index + 1}`}
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Mobile View Image */}
                <section className="p-6 bg-[#1a2333] flex flex-col gap-6 items-center justify-center lg:hidden pt-24">
                    {imageUrls.length > 0 && resumeUrl && (
                        imageUrls.map((url, index) => (
                            <div key={index} className="bg-[#0B1120] p-1 shadow-2xl rounded-2xl h-[450px] border border-white/5">
                                <img src={url} className="h-full object-contain rounded-xl" alt={`Resume Page ${index + 1}`} />
                            </div>
                        ))
                    )}
                </section>

                {/* Right Panel: Feedback */}
                <section className="feedback-section !w-1/2 !px-8 lg:!px-12 !py-12 flex flex-col gap-10 max-lg:!w-full bg-[#0B1120]">
                    {feedback ? (
                        <div className="flex flex-col gap-10 animate-in slide-in-from-right-8 duration-700 w-full pb-20">
                            {/* Header for content */}
                            <div className="mb-4">
                                <h2 className="text-3xl font-black !text-white mb-2 tracking-tight">Analysis Results</h2>
                                <p className="text-base text-slate-500 font-medium uppercase tracking-wider">PDF format only (Max 2 pages, 5MB)</p>
                            </div>

                            <div className="space-y-12">
                                <Summary feedback={feedback} />
                                <div className="h-px w-full bg-gradient-to-r from-white/5 via-white/10 to-transparent"></div>
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                <div className="h-px w-full bg-gradient-to-r from-white/5 via-white/10 to-transparent"></div>
                                <Details feedback={feedback} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[70vh] text-center w-full">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                                <img src="/images/resume-scan-2.gif" className="w-[180px] relative z-10 rounded-[2rem] shadow-2xl border border-white/10" alt="Generating Feedback..." />
                            </div>
                            <h3 className="text-2xl font-black text-white font-black animate-pulse tracking-tight">Generating Perspective...</h3>
                            <p className="text-slate-400 mt-3 max-w-sm mx-auto font-medium">Analyzing keywords, formatting, and industry impact to give you the edge.</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default resume
