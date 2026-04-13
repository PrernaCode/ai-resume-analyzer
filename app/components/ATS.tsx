interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  // Determine colors based on score
  const scoreColor = score > 69 ? 'text-emerald-400' : score > 49 ? 'text-amber-400' : 'text-rose-400';
  const scoreBg = score > 69 ? 'bg-emerald-500/10' : score > 49 ? 'bg-amber-500/10' : 'bg-rose-500/10';
  const scoreBorder = score > 69 ? 'border-emerald-500/20' : score > 49 ? 'border-amber-500/20' : 'border-rose-500/20';

  // Determine subtitle based on score
  const subtitle = score > 69 ? 'Elite Performance' : score > 49 ? 'Competitive Standing' : 'Critical Refinement Required';

  return (
    <div className="bg-[#1a2333]/40 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
      {/* Decorative glow */}
      <div className={`absolute -top-[20%] -right-[20%] w-[50%] h-[50%] ${score > 69 ? 'bg-emerald-500/5' : 'bg-rose-500/5'} rounded-full blur-[100px] pointer-events-none`}></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 rounded-2xl ${scoreBg} border ${scoreBorder} flex items-center justify-center shadow-lg`}>
              <svg className={`w-8 h-8 ${scoreColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black !text-white tracking-tight">ATS Score: {score}</h2>
              <p className={`text-sm font-bold uppercase tracking-widest ${scoreColor}`}>{subtitle}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1">Pass Probability</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${score > 69 ? 'bg-emerald-500' : 'bg-rose-500'} transition-all duration-1000`} style={{ width: `${score}%` }}></div>
              </div>
              <span className="text-xs font-black text-white">{score}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">
            This metric evaluates how effectively your resume navigates algorithmic filtering systems used by modern Fortune 500 companies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${suggestion.type === 'good' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                <div className={`mt-0.5 p-1 rounded-md ${suggestion.type === 'good' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={suggestion.type === 'good' ? "M5 13l4 4L19 7" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"}></path>
                  </svg>
                </div>
                <p className={`text-sm font-semibold ${suggestion.type === 'good' ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {suggestion.tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-xs text-slate-500 font-bold italic">
            Optimizing for ATS increases your interview callback rate by up to 40% in technical sectors.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ATS