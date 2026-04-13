import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import HeroVisual from "~/components/HeroVisual";


export const meta: MetaFunction = () => {
    const baseUrl = "https://resumeiq-lyart.vercel.app";

    return [
        { title: "ResumeIQ | AI Resume Analyzer & ATS Optimizer" },
        { name: "description", content: "Optimize your resume for your dream job with AI-powered feedback, ATS scoring, and actionable improvement tips." },
        { property: "og:title", content: "ResumeIQ | AI Resume Analyzer" },
        { property: "og:description", content: "Get instant, professional feedback on your resume. Optimize for ATS and land more interviews with AI." },
        { property: "og:image", content: `${baseUrl}/og-image.png` },
        { property: "og:url", content: baseUrl },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${baseUrl}/og-image.png` },
    ];
}

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-['Mona Sans'] overflow-x-hidden selection:bg-blue-500/30">

            {/* Navbar (Custom for HomeTwo) */}
            <nav className="fixed w-full z-50 top-0 left-0 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                <span className="font-bold text-lg">R</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">Resume<span className="text-blue-500">IQ</span></span>
                        </div>

                        {/* Buttons (with Nav Links moved here) */}
                        <div className="flex items-center gap-6 md:gap-8">
                            <a href="#features" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
                            <a href="#how-it-works" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">How it Works</a>
                            <a href="#" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
                            <Link to="/auth" className="hidden md:block px-5 py-2.5 rounded-lg text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-all">Sign In</Link>
                            <Link to="/auth" className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5">
                                Analyze Now
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Content */}
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                Trusted by 10,000+ Job Seekers
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight !text-white leading-[1.1] mb-6" style={{ color: 'white' }}>
                                AI Resume Analyzer that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">improves</span> your chances
                            </h1>

                            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
                                Optimize your resume for ATS, identify skill gaps, and land more interviews with our advanced AI engine. Don't let a robot reject your hard work.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/auth" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    Upload Your Resume
                                </Link>
                            </div>

                            <div className="mt-10 flex items-center gap-6 text-slate-500 text-sm font-medium">
                                <span>WORKS WITH:</span>
                                <div className="flex gap-4 text-slate-400">
                                    <div className="flex items-center gap-1"><img src="/images/pdf.png" alt="PDF" className="w-5 h-5 object-contain opacity-70" /> PDF</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="relative">
                            <HeroVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-slate-900 border-t border-white/5 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text  bg-gradient-to-r !text-white mb-4">How it Works</h2>
                        <p className="text-slate-400">Three simple steps to a job-winning resume.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0"></div>

                        <div className="relative group">
                            <div className="absolute top-0 left-0 -mt-1 -ml-1 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]">1</div>
                            <div className="bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-1 group-hover:shadow-2xl">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Upload</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">Securely drag and drop your current resume in PDF or DOCX format.</p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute top-0 left-0 -mt-1 -ml-1 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]">2</div>
                            <div className="bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-1 group-hover:shadow-2xl">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Analyze</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">Our AI scans against thousands of job descriptions to find inconsistencies.</p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute top-0 left-0 -mt-1 -ml-1 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]">3</div>
                            <div className="bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-1 group-hover:shadow-2xl">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Optimize</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">Get actionable feedback, tone corrections, and skill gap alerts instantly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 right-0 -mr-40 -mt-20 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <div className="order-2 lg:order-1 relative">
                            {/* Code Analysis Visual */}
                            <div className="relative rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col font-mono text-xs md:text-sm">
                                {/* Window Header */}
                                <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                                    <div className="flex gap-2 mr-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <div className="text-slate-500">resume_scan.json</div>
                                </div>

                                {/* Code Content */}
                                <div className="p-6 text-slate-400 space-y-2 overflow-hidden relative">
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">1</span>
                                        <span className="text-purple-400">{"{"}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">2</span>
                                        <span className="pl-4">"candidate": <span className="text-green-400">"Alex Doe"</span>,</span>
                                    </div>
                                    <div className="flex relative bg-blue-500/10 -mx-6 px-6 py-0.5 border-l-2 border-blue-500">
                                        <span className="text-slate-600 w-8 select-none">3</span>
                                        <span className="pl-4">"experience": [</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">4</span>
                                        <span className="pl-8">{"{"}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">5</span>
                                        <span className="pl-12">"role": <span className="text-green-400">"Senior Dev"</span>,</span>
                                    </div>
                                    <div className="flex relative">
                                        <span className="text-slate-600 w-8 select-none">6</span>
                                        <span className="pl-12 text-slate-500"> // Analyzing keywords...</span>
                                        {/* Floating Badge */}
                                        <div className="absolute right-0 top-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse">
                                            MATCH FOUND
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">7</span>
                                        <span className="pl-12">"skills": [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node"</span>],</span>
                                    </div>
                                    <div className="flex relative bg-red-500/10 -mx-6 px-6 py-0.5 border-l-2 border-red-500">
                                        <span className="text-slate-600 w-8 select-none">8</span>
                                        <span className="pl-12">"gap": <span className="text-red-400">"Missing: TypeScript"</span></span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">9</span>
                                        <span className="pl-8">{"}"}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">10</span>
                                        <span className="pl-4">],</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">11</span>
                                        <span className="pl-4">"ats_score": <span className="text-blue-400 font-bold">88</span></span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-slate-600 w-8 select-none">12</span>
                                        <span className="text-purple-400">{"}"}</span>
                                    </div>

                                    {/* Scanning Line */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-[scan_3s_ease-in-out_infinite] pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Floating Card Overlay */}
                            <div className="absolute -bottom-6 -right-6 bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-700 max-w-[200px] animate-[bounce_4s_infinite]">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs font-bold text-slate-300">Optimization Complete</span>
                                </div>
                                <div className="text-sm font-bold text-white mb-1">Score Increased</div>
                                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                                    +15%
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight !text-white mb-8">
                                Everything you need to <span className="text-blue-500">beat the bots.</span>
                            </h2>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">ATS Score Dashboard</h3>
                                        <p className="text-slate-400 text-sm">Get a detailed report on how applicant tracking systems read your experience.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Tone & Sentiment Analysis</h3>
                                        <p className="text-slate-400 text-sm">Ensure your professional voice is confident, balanced, and industry-appropriate.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Skill Gap Detection</h3>
                                        <p className="text-slate-400 text-sm">Discover exactly which certifications or hard skills you're missing for a target role.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
                    {/* Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <h3 className="text-3xl md:text-5xl font-bold !text-white mb-6 relative z-10">Ready to land your next interview?</h3>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                        Join thousands of successful candidates who used our AI to optimize their professional profiles.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <Link to="/auth" className="px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-xl">
                            Analyze My Resume Free
                        </Link>
                        <a href="#" className="px-8 py-3.5 bg-blue-700/50 text-white border border-blue-400/30 font-bold rounded-xl hover:bg-blue-700 transition-colors">
                            View Pricing Plans
                        </a>
                    </div>

                    <p className="mt-8 text-blue-200/80 text-xs text-center">No credit card required. Scan up to 3 resumes for free.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0B1120] border-t border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">R</div>
                                <span className="text-lg font-bold">Resume<span className="text-blue-500">IQ</span></span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                                Empowering job seekers with enterprise-grade AI analysis to bypass filters and land dream opportunities.
                            </p>
                            <p className="text-slate-600 text-xs">© 2026 Resume Analyzer. All rights reserved.</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6">Product</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-blue-500 transition-colors">Analyzer</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors">Skill Match</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors">Templates</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors">Extension</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6">Resources</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-blue-500 transition-colors">Career Blog</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors">ATS Guide</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors">Resume Help</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors">Success Stories</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6">Stay Updated</h4>
                            <p className="text-slate-500 text-xs mb-4">Get the latest career tips delivered to your inbox.</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="!bg-white/5 border border-white/10 !rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-blue-500 text-white placeholder:text-slate-500 transition-all"
                                />
                                <button className="bg-blue-600 !rounded-xl px-5 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex justify-end gap-6 text-xs text-slate-500">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
