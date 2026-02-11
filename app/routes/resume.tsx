import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import Details from "~/components/Details";
import ATS from "~/components/ATS";
import Navbar from "~/components/Navbar";


export const meta = () => ([
    { title: 'ResumeIQ | Review' },
    { name: 'description', content: 'Detailed overview of your resume' }
])

const resume = () => {
    const { kv, auth, isLoading, fs } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
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

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
        }

        loadResume();
    }, [id]);

    return (
        <main className="min-h-screen bg-slate-50 font-['Mona Sans'] pt-16 flex flex-col">
            <Navbar />

            <div className="flex flex-row w-full max-lg:flex-col-reverse flex-grow relative">
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[calc(100vh-4rem)] sticky top-16 hidden lg:block border-r border-indigo-50/50 overflow-y-auto no-scrollbar">
                    {imageUrl && resumeUrl && (
                        <div className="w-full min-h-full p-2 flex justify-center items-start">
                            <div className="animate-in fade-in zoom-in-95 duration-700 gradient-border p-1 bg-white shadow-xl rounded-xl w-full max-w-2xl">
                                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full overflow-hidden rounded-lg">
                                    <img
                                        src={imageUrl}
                                        className="w-full h-auto object-contain cursor-zoom-in"
                                        title="Click to Open PDF"
                                        alt="Resume Preview"
                                    />
                                </a>
                            </div>
                        </div>
                    )}
                </section>

                {/* Mobile View Image */}
                <section className="p-6 bg-slate-100 flex items-center justify-center lg:hidden">
                    {imageUrl && resumeUrl && (
                        <div className="gradient-border p-1 bg-white shadow-lg rounded-xl h-[400px]">
                            <img src={imageUrl} className="h-full object-contain rounded-lg" />
                        </div>
                    )}
                </section>

                <section className="feedback-section !w-1/2 !px-8 lg:!px-16 !py-12 flex flex-col gap-10 max-lg:!w-full">
                    {feedback ? (
                        <div className="flex flex-col gap-10 animate-in slide-in-from-right-8 duration-700 w-full pb-10">
                            {/* Header for content */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h2>
                                <p className="text-gray-500">Detailed insights to improve your resume.</p>
                            </div>

                            <Summary feedback={feedback} />
                            <div className="h-px w-full bg-indigo-50"></div>
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <div className="h-px w-full bg-indigo-50"></div>
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-center w-full">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-10 rounded-full animate-pulse"></div>
                                <img src="/images/resume-scan-2.gif" className="w-[180px] relative z-10 rounded-2xl mix-blend-multiply" alt="Generating Feedback..." />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 animate-pulse">Generating your personalized analysis...</h3>
                            <p className="text-gray-500 mt-2">Analyzing keywords, formatting, and impact.</p>
                        </div>
                    )}
                </section>
            </div>

            {/* Simple Footer */}
            <footer className="bg-white border-t border-indigo-50 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-gray-400 text-sm font-medium">© {new Date().getFullYear()} ResumeIQ. All rights reserved.</p>
                </div>
            </footer>
        </main>
    )
}

export default resume
