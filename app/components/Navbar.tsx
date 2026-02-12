import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSignOut = async () => {
    await auth.signOut();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/auth?next=/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:shadow-blue-500/50 transition-all duration-300">
              <span className="font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Resume<span className="text-blue-500">IQ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/upload" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Upload Resume
            </Link>

            {auth.isAuthenticated && auth.user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all focus:outline-none"
                >
                  <div className="text-right">
                    <p className="text-sm font-bold text-white leading-tight">{auth.user.username}</p>
                    <p className="text-[10px] font-medium text-slate-400">Pro Account</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 p-0.5 ring-1 ring-white/20 shadow-lg">
                    <img
                      src="/images/user.png"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + auth.user?.username + '&background=0D1117&color=fff';
                      }}
                    />
                  </div>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <>
                    <div className="absolute right-0 mt-3 w-56 bg-[#0B1120] rounded-2xl shadow-2xl border border-white/5 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                      <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{auth.user.username}</p>
                      </div>
                      <div className="p-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors flex items-center gap-2 font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/auth?next=/" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
                Log In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0B1120]/95 backdrop-blur-xl absolute w-full shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {auth.isAuthenticated && auth.user && (
              <div className="flex items-center gap-3 px-2 mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 p-0.5">
                  <img
                    src="/images/user.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + auth.user?.username + '&background=0D1117&color=fff';
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{auth.user.username}</p>
                  <p className="text-xs text-blue-400 font-medium">Logged in</p>
                </div>
              </div>
            )}

            <Link
              to="/upload"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Upload New Resume
            </Link>

            {auth.isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Log Out
              </button>
            ) : (
              <Link
                to="/auth?next=/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
