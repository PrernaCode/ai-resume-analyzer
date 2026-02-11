import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
    [
        { title: 'ResumeIQ | Auth' },
        { name: 'description', content: 'Authenticate to access your ResumeIQ account' }
    ]
}

const auth = () => {
    const { isLoading, auth } = usePuterStore();
    const navigate = useNavigate();
    const location = useLocation();
    const next = location.search.split('next=')[1];

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next]);

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 font-['Inter']">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden relative">
                    {/* Decorative shine effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="mb-6 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-3 shadow-lg transform transition-transform hover:scale-105 duration-300">
                            {/* Simple Logo Icon/Placeholder */}
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                            Resume<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">IQ</span>
                        </h1>
                        <h2 className="text-lg font-medium text-gray-600 mb-8">
                            Authenticate to access your workspace
                        </h2>

                        <div className="w-full">
                            {isLoading ? (
                                <button disabled className="w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-75 cursor-wait">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </button>
                            ) : (
                                <>
                                    {auth.isAuthenticated ? (
                                        <button
                                            onClick={auth.signOut}
                                            className="w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            Sign Out
                                        </button>
                                    ) : (
                                        <button
                                            onClick={auth.signIn}
                                            className="w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                {/* Lock Icon */}
                                                <svg className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            Sign in with Puter.js
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200/40 w-full text-center">
                            <p className="text-xs text-gray-500">
                                Protected by secure authentication
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default auth
