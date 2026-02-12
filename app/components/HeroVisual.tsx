import React from 'react';

const HeroVisual = () => {
    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Glow Effect behind */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 animate-pulse"></div>

            <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-6 md:p-8 overflow-hidden">

                {/* Main Content Layout */}
                <div className="flex gap-6">

                    {/* Left Column - Mock Resume Lines (Faded) */}
                    <div className="flex-1 space-y-4 opacity-30 pointer-events-none select-none">
                        <div className="h-4 w-3/4 bg-slate-700 rounded animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-slate-700 rounded"></div>
                            <div className="h-2 w-full bg-slate-700 rounded"></div>
                            <div className="h-2 w-5/6 bg-slate-700 rounded"></div>
                        </div>
                        <div className="pt-4 h-4 w-1/2 bg-slate-700 rounded"></div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-slate-700 rounded"></div>
                            <div className="h-2 w-full bg-slate-700 rounded"></div>
                            <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Insights */}
                    <div className="w-5/12 space-y-4">

                        {/* ATS Score Card */}
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">ATS Score</div>
                            <div className="text-3xl font-extrabold text-blue-400">84%</div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full w-[84%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            </div>
                        </div>

                        {/* Found Skills */}
                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                Found Skills
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-medium border border-emerald-500/10">React</span>
                                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-medium border border-emerald-500/10">Python</span>
                            </div>
                        </div>

                        {/* Gap Detected */}
                        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-amber-500 font-bold text-[10px] uppercase tracking-wider">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                Gap Detected
                            </div>
                            <div className="text-[10px] mt-1 text-amber-400/90 leading-tight font-medium">
                                Add 'Cloud Computing' to match JD.
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Suggestion Tooltip / Popout */}
                <div className="absolute top-1/2 left-[15%] transform -translate-y-1/2">
                    <div className="bg-slate-800 p-3 rounded-lg shadow-2xl border border-blue-500/30 max-w-[180px] animate-[bounce_3s_infinite]">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 mb-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            AI Suggestion:
                        </div>
                        <p className="text-[11px] font-medium text-slate-300 leading-snug">
                            Strengthen action verbs here to improve score by <span className="text-emerald-400 font-bold">12%</span>.
                        </p>
                        {/* Arrow */}
                        <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-slate-800 border-b border-r border-blue-500/30 transform rotate-45"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroVisual;
