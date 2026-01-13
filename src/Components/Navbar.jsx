import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/moviemania_Logo.webp";

const Title = () => (
    <Link to="/" className="flex items-center space-x-3 group">
        <div className="relative">
            <img
                src={logo}
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl shadow-lg transform group-hover:scale-110 transition-all duration-300 border-2 border-purple-400/30"
                alt="Movie Mania"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent font-poppins">
            MovieMania
        </span>
    </Link>
);

const NavLink = ({ to, children, icon, setMenuOpen }) => (
    <Link
        to={to}
        className="group relative px-3 sm:px-4 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 hover:scale-105 transform font-inter text-sm sm:text-base"
        onClick={() => setMenuOpen?.(false)}
    >
        <span className="flex items-center space-x-2">
            {icon && <span className="text-lg">{icon}</span>}
            <span>{children}</span>
        </span>
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
    </Link>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10 shadow-xl overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                {/* Logo and Title */}
                <Title />

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <NavLink to="/" icon="🏠">Home</NavLink>
                    <NavLink to="/movies" icon="🎥">Movies</NavLink>
                    <NavLink to="/tv-shows" icon="📺">TV Shows</NavLink>
                    <NavLink to="/trending" icon="🔥">Trending</NavLink>
                    <NavLink to="/watchlist" icon="📝">Watchlist</NavLink>
                </div>

                {/* Hamburger Menu Button */}
                <div className="md:hidden">
                    <button
                        className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900/90 backdrop-blur-xl border-t border-white/10 py-4 px-4 space-y-2">
                    <NavLink to="/" icon="🏠" setMenuOpen={setIsMenuOpen}>Home</NavLink>
                    <NavLink to="/movies" icon="🎥" setMenuOpen={setIsMenuOpen}>Movies</NavLink>
                    <NavLink to="/tv-shows" icon="📺" setMenuOpen={setIsMenuOpen}>TV Shows</NavLink>
                    <NavLink to="/trending" icon="🔥" setMenuOpen={setIsMenuOpen}>Trending</NavLink>
                    <NavLink to="/watchlist" icon="📝" setMenuOpen={setIsMenuOpen}>Watchlist</NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
