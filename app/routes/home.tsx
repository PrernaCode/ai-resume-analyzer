import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import Resume from "~/components/Resume";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeIQ" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const {isLoading, auth} =usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.search.split('next=')[1];

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  },[auth.isAuthenticated]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review Your Submissions and check AI-powered feedback.</h2>
      </div>

      {resumes.length >0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <Resume key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>
    
  </main>;
}
