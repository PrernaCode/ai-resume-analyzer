import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ResumeIQ" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ));
      console.log("Parsed resumes:", parsedResumes);
      setResumes(parsedResumes);
      setLoadingResumes(false);
    }
    loadResumes();
  }, []);



  return (
    <main className="min-h-screen bg-aurora relative overflow-hidden font-['Mona Sans']">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <section className="flex flex-col items-center text-center gap-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="max-w-4xl relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
              Optimize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future</span>
            </h1>

            {!loadingResumes && resumes.length === 0 ? (
              <h2 className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                Get instant, AI-powered feedback on your resume and land your dream job faster.
              </h2>
            ) : (
              <h2 className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
                Welcome back! Here's your resume performance overview.
              </h2>
            )}
          </div>

          {!loadingResumes && resumes.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              <div className="glass-card px-8 py-6 rounded-3xl flex flex-col items-center min-w-[160px]">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Resumes Checked</span>
                <span className="text-4xl font-extrabold text-gray-900">{resumes.length}</span>
              </div>
              <div className="glass-card px-8 py-6 rounded-3xl flex flex-col items-center min-w-[160px]">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Average Score</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-indigo-600">
                    {Math.round(resumes.reduce((acc, curr) => acc + (curr.feedback?.overallScore || 0), 0) / (resumes.length || 1))}
                  </span>
                  <span className="text-gray-400 font-bold">/100</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
              <img src="/images/resume-scan-2.gif" className="w-[150px] relative z-10 rounded-2xl shadow-lg" alt="Loading..." />
            </div>
            <p className="mt-8 text-indigo-600 font-bold tracking-wide animate-pulse">SYNCING WORKSPACE...</p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
            {resumes.map((resume) => (
              <div key={resume.id} className="h-full">
                <ResumeCard resume={resume} />
              </div>
            ))}

            {/* Add New Card - Inline */}
            <Link to="/upload" className="group h-full min-h-[350px] rounded-3xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-white/30 hover:bg-white/60 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 text-indigo-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
              </div>
              <p className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">Analyze New Resume</p>
              <p className="text-sm text-gray-500 mt-2 font-medium">PDF or Image Supported</p>
            </Link>
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 px-4">
            <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border border-white/50 max-w-2xl w-full text-center relative overflow-hidden group">

              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
              <div className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] bg-indigo-200/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                <div className="w-28 h-28 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <img src="/images/pdf.png" alt="Upload" className="w-14 h-14 opacity-90" />
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Ready to stand out?</h2>
                <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
                  Upload your resume now to get actionable insights and improve your ATS score instantly.
                </p>
                <Link to="/upload" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
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
