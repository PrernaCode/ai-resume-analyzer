# AI Resume Analyzer
> Elevate your job search with AI-powered resume insights and ATS optimization.


🔗 **Links:**
- **Live Demo:** [https://resumeiq-lyart.vercel.app/]


## Overview
**AI Resume Analyzer** is a modern web application designed to help job seekers bridge the gap between their resumes and their dream jobs. The app uses advanced AI to evaluate resumes against specific job descriptions, providing a detailed breakdown of Suitability, Applicant Tracking System (ATS) compatibility, and actionable coaching feedback. It is built for candidates who want a data-driven edge in a competitive hiring market.

---

## Features
- **Account Creation via Puter**: Secure and seamless authentication using the [Puter.js](https://puter.com/) cloud ecosystem.
- **TypeScript & Type Safety**: Developed with strict type-safety for robust, error-free resume parsing logic.
- **Resume Upload**: Supports PDF uploads with a built-in validator (optimized for max 2 pages and 5MB).
- **Target Job Form**: Tailor your analysis by providing the Company Name, Job Title, and specific Job Description.
- **Real-time Progress Indicator**: A dynamic visual tracker that guides you through PDF conversion, cloud upload, and AI analysis phases.
- **Analysis Results Page**:
    - **ATS Match Score**: A high-level gauge of how well your resume matches recruiter scanning software.
    - **Tone & Style**: Evaluation of professional language and impact.
    - **Content Quality**: Insights into experience descriptions and quantitative achievements.
    - **Structure & Formatting**: Feedback on layout, hierarchy, and readability.
    - **Comprehensive Results**: Full breakdown including ATS Match Score, Tone & Style, Content Quality, Structure evaluation, and Skill gap analysis.
- **Responsive & Mobile Friendly**: Fully optimized for mobile, tablet, and desktop viewing experiences.
- **Resume Sideview**: A dedicated left-panel preview of your resume pages for context while reviewing feedback.
- **Analysis History**: A personalized workspace dashboard showing all past scans with thumbnail previews and quick-access scores.

---

## Tech Stack
- **Frontend Framework**: [React Router 7](https://reactrouter.com/) (formerly Remix) with [Vite](https://vitejs.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/) (for type-safe development and stability)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with Custom Mona Sans Typography
- **Core Backend Services**: [Puter.js](https://puter.com/) (Auth, Cloud FS, KV Store)
- **AI Engine**: Puter Cloud AI (utilizing `gpt-5-nano` / high-performance vision models)
- **PDF Processing**: [`pdfjs-dist`](https://github.com/mozilla/pdf.js) for browser-side PDF rendering

---

## Project Structure
```text
├── app/
│   ├── components/       # Reusable UI components (ATS.tsx, Summary.tsx, Navbar.tsx)
│   ├── lib/              # Core utility modules:
│   │   ├── puter.ts      # Puter.js integration & Zustand store
│   │   ├── pdfToImage.ts # PDF rendering and conversion logic
│   │   ├── safeParser.ts # Robust AI response parsing
│   │   └── validation.ts # Form and file validation rules
│   ├── routes/           # Application pages:
│   │   ├── home.tsx      # Dashboard & history view
│   │   ├── upload.tsx    # Multi-step upload form
│   │   ├── resume.tsx    # Detailed results view
│   │   └── auth.tsx      # Puter authentication handler
│   ├── root.tsx          # App entry point and global layout
│   └── routes.ts         # Routing configuration
├── constants/
│   └── index.ts          # AI prompt templates and feedback criteria
├── public/               # Static assets (PDF worker, images, fonts)
└── vite.config.ts        # Vite build configuration
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or later)
- npm (v9.0 or later)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   ```bash
   cp .env.example .env
   ```

### Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## How It Works
1. **Sign Up**: Register or log in using your Puter account from any device.
2. **Dashboard**: Access your mobile-friendly workspace and click "Upload New Resume".
3. **Set Targets**: Enter the company name, job title, and paste the job description you are applying for.
4. **Upload**: Drag and drop your PDF resume. The system will validate and convert it to previews.
5. **Analyze**: Watch as the AI parses your resume and compares it against the job description requirements.
6. **Results**: Review your scores and actionable checklists to improve your application.
7. **History**: Revisit your analysis anytime from the dashboard to track your improvements.

---

## Environment Variables
The following variables can be configured in your `.env` file:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_BASE_URL` | The base URL of your hosted application. | `https://resume-iq.vercel.app` |
| `VITE_PUTER_SITE_NAME` | (Optional) Custom identifier for Puter sessions. | `ResumeIQ` |


## Known Limitations
- **PDF Constraints**: Supports a maximum of 2 pages for optimal performance and AI processing speed.
- **File Size**: Maximum file size is limited to 5MB.
- **Cloud Dependency**: Application requires a Puter environment to function correctly (storage, auth, and AI).

---

## Future Improvements
- [ ] **Export to PDF**: Generate a localized report of the AI feedback for offline viewing.
- [ ] **LinkedIn Integration**: Sync your profile directly with the analysis tool.
- [ ] **Multi-Language Support**: Expand AI prompts to support resumes in Spanish, French, and German.
- [ ] **Job Board Scraper**: Automatically pull job descriptions via URL.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
Built with ❤️ using React Router and Puter.js
