import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import LandingPage from "./LandingPage";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ResumeIQ" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    if (auth.isAuthenticated) {
      const loadResumes = async () => {
        setLoadingResumes(true);
        const resumes = (await kv.list('resume:*', true)) as KVItem[];

        const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value)
        )) || [];

        // Sort by date if available, or keep order
        setResumes(parsedResumes);
        setLoadingResumes(false);
      }
      loadResumes();
    }
  }, [auth.isAuthenticated]);

  // Pagination Logic
  const totalPages = Math.ceil(resumes.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResumes = resumes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white font-['Mona Sans'] selection:bg-blue-500/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight !text-white mb-2">Resume Management</h1>
            <p className="text-slate-400 text-lg">Manage and analyze candidate applications with AI efficiency.</p>
          </div>

        </section>

        {/* Statistics Grid */}
        {!loadingResumes && resumes.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="bg-[#1a2333] border border-white/5 p-6 rounded-2xl group hover:border-blue-500/30 transition-all">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Total Scanned</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{resumes.length.toLocaleString()}</span>
                <span className="text-xs font-bold text-green-400">+12%</span>
              </div>
            </div>
            <div className="bg-[#1a2333] border border-white/5 p-6 rounded-2xl group hover:border-blue-500/30 transition-all">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Avg. ATS Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">
                  {Math.round(resumes.reduce((acc, curr) => acc + (curr.feedback?.overallScore || 0), 0) / (resumes.length || 1))}
                  <span className="text-slate-600 text-lg ml-1">/100</span>
                </span>
              </div>
            </div>
          </section>
        )}

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
              <img src="/images/resume-scan-2.gif" className="w-[150px] relative z-10 rounded-2xl shadow-2xl border border-white/10" alt="Loading..." />
            </div>
            <p className="mt-8 text-blue-400 font-black tracking-[0.2em] animate-pulse text-sm">SYNCING WORKSPACE...</p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
              {currentResumes.map((resume) => (
                <div key={resume.id} className="h-full">
                  <ResumeCard
                    resume={resume}
                    onDelete={async (id) => {
                      try {
                        setResumes(current => current.filter(r => r.id !== id));
                        const key = `resume:${id}`;
                        await kv.del(key);
                      } catch (err) {
                        console.error("Failed to delete resume:", err);
                      }
                    }}
                  />
                </div>
              ))}

              {/* Add New Card - Inline (Always shown as 6th card) */}
              <Link to="/upload" className="group h-full min-h-[400px] rounded-[2.5rem] border-2 border-dashed border-white/10 hover:border-blue-500/50 bg-white/5 hover:bg-white/[0.08] backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden">
                <div className="w-20 h-20 rounded-[2rem] bg-[#0B1120] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500 text-blue-500 shadow-2xl">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">Upload New Resume</p>
                  <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-[0.2em] opacity-60">Initialize Analysis</p>
                </div>
              </Link>
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 py-10 border-t border-white/5">
                <button
                  onClick={() => {
                    setCurrentPage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-xl text-sm font-black transition-all duration-200 ${currentPage === page
                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110'
                        : 'text-slate-500 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            )}
          </>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-[#1a2333]/60 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border border-white/5 max-w-2xl w-full text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <img src="/images/pdf.png" alt="Upload" className="w-12 h-12 opacity-80" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Ready to stand out?</h2>
                <p className="text-lg text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
                  Upload your resume now to get actionable insights and improve your ATS score instantly.
                </p>
                <Link to="/upload" className="inline-flex items-center justify-center px-10 py-4 rounded-2xl text-lg font-black text-white bg-blue-600 hover:bg-blue-500 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all hover:-translate-y-1">
                  Upload Your First Resume
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
