import { Link } from "react-router"
import ScoreCircle from "./ScoreCircle"
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');
    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if (!blob) return;

            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }
        loadResume();
    }, [imagePath])

    return (
        <div className="group relative">
            <Link to={`/resume/${id}`} className="block h-full resume-card-new transform transition-all duration-300 hover:-translate-y-2">
                <div className="relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col group-hover:shadow-xl transition-shadow">

                    {/* Image Section */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        {resumeUrl ? (
                            <>
                                <img
                                    src={resumeUrl}
                                    alt="Resume Preview"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent"></div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-300">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                        )}

                        {/* Score Badge floating */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
                            <ScoreCircle score={feedback.overallScore} />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold  text-gray-900 uppercase tracking-wider mb-1">
                                {companyName || 'Unknown Company'}
                            </h3>
                            <h2 className="text-sm font-medium text-indigo-500 leading-tight line-clamp-2" title={jobTitle}>
                                {jobTitle || 'Resume'}
                            </h2>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                Analyzed
                            </span>
                            <span className="group-hover:text-indigo-600 font-medium transition-colors">
                                View Details →
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ResumeCard
