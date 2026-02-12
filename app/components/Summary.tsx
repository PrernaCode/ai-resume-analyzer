import React from 'react'
import ScoreGauge from './ScoreGauge';
import ScoreBadge from './ScoreBadge';

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score >= 70 ? 'text-emerald-400'
        : score > 49 ? 'text-amber-400' : 'text-rose-400';

    const bgColor = score >= 70 ? 'bg-emerald-500/10'
        : score > 49 ? 'bg-amber-500/10' : 'bg-rose-500/10';

    return (
        <div className={`flex items-center justify-between p-4 rounded-xl border border-white/5 ${bgColor} transition-all hover:scale-[1.01]`}>
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${textColor.replace('text', 'bg')} shadow-[0_0_8px_currentColor]`}></div>
                <p className="text-sm font-bold text-white uppercase tracking-wider">{title}</p>
            </div>
            <div className="flex items-baseline gap-1">
                <span className={`text-lg font-black ${textColor}`}>{score}</span>
                <span className="text-[10px] font-bold text-slate-500">/100</span>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-[#1a2333]/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/5 pb-8">
                <div className="relative group">
                    <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <ScoreGauge score={feedback.overallScore} />
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-black !text-white mb-2 italic">Performance Analytics</h2>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                        Your score is dynamically computed based on content depth, structural integrity, and industry alignment.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}

export default Summary
