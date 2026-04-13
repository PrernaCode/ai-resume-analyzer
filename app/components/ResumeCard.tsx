import { Link } from "react-router"
import ScoreCircle from "./ScoreCircle"
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { cn } from "~/lib/utils";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath, thumbnailPath }, onDelete }: { resume: any, onDelete?: (id: string) => void }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const loadResume = async () => {
            setImageLoading(true);
            try {
                const pathToRead = (thumbnailPath as string) || imagePath;
                const blob = await fs.read(pathToRead);
                if (blob) {
                    let url = URL.createObjectURL(blob);
                    setResumeUrl(url);
                }
            } catch (err) {
                // Silently handle image loading errors
            } finally {
                setImageLoading(false);
            }
        }
        loadResume();
    }, [imagePath, thumbnailPath])

    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Start animation
        setIsDeleting(true);
        setShowConfirm(false);

        // Wait for animation to finish (500ms to match duration-500)
        setTimeout(() => {
            if (onDelete) {
                onDelete(id);
            }
        }, 500);
    };

    return (
        <div className={`group relative h-full transition-all duration-500 ${isDeleting ? 'opacity-0 scale-90 translate-y-4' : 'opacity-100 scale-100'}`}>
            <Link to={`/resume/${id}`} className="block h-full transform transition-all duration-500 hover:-translate-y-3 group/card">
                <div className="relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden h-full flex flex-col group-hover:bg-white/[0.08] group-hover:border-blue-500/50 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6),0_0_20px_rgba(37,99,235,0.2)] transition-all duration-500">

                    {/* Image Section */}
                    <div className="relative h-56 w-full bg-[#030712] overflow-hidden p-3 pb-0">
                        <div className="w-full h-full rounded-t-[1.5rem] overflow-hidden border border-white/5 bg-[#0B1120] relative group-hover/card:border-blue-500/30 transition-colors duration-500">
                            {imageLoading ? (
                                <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin"></div>
                                </div>
                            ) : resumeUrl ? (
                                <div className="animate-in fade-in duration-700 h-full w-full">
                                    <img
                                        src={resumeUrl}
                                        alt="Resume Preview"
                                        className="w-full h-full object-cover object-top transition-all duration-700 scale-[1.01] group-hover/card:scale-110"
                                    />
                                    {/* Glass Overlay for depth */}
                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-t-[1.5rem]"></div>
                                    {/* Top-down gradient to frame white resumes */}
                                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#030712]/60 to-transparent"></div>
                                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030712]/80 to-transparent"></div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-800">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col">
                        <div className="mb-6 flex justify-between items-start gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-black text-white tracking-tight mb-2 group-hover/card:text-blue-400 transition-colors uppercase truncate">
                                    {companyName || 'Unknown Agency'}
                                </h3>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{jobTitle || 'General Application'}</span>
                                </div>
                            </div>

                            {/* Score Badge - Relocated for visibility */}
                            <div className={cn(
                                "px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-2xl flex items-center shrink-0 transition-all duration-500",
                                feedback.overallScore >= 80 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                                    feedback.overallScore >= 60 ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                                        "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            )}>
                                <span className="text-[10px] font-black tracking-[0.1em] uppercase">
                                    {feedback.overallScore} SCORE
                                </span>
                            </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center relative">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                                    <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Analysis</span>
                                </div>

                                {/* Delete Button */}
                                <div className="relative z-20">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowConfirm(!showConfirm);
                                        }}
                                        className="p-2.5 text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 rounded-2xl transition-all active:scale-95"
                                        title="Archive"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>

                                    {/* Confirmation Popover */}
                                    {showConfirm && (
                                        <div className="absolute bottom-full left-0 mb-4 w-56 bg-[#0B1120] border border-white/10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] p-5 z-30 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                            <p className="text-sm font-black text-white mb-4 italic tracking-tight">Archive Analysis?</p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleDelete}
                                                    className="flex-1 px-4 py-2.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/20"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setShowConfirm(false);
                                                    }}
                                                    className="flex-1 px-4 py-2.5 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                                                >
                                                    back
                                                </button>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute top-full left-5 -mt-2 w-4 h-4 bg-[#0B1120] border-b border-r border-white/10 transform rotate-45"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] group-hover/card:translate-x-1 transition-transform">
                                Explore
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ResumeCard
