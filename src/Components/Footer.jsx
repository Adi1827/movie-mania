const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="w-full bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 sm:col-span-2 md:col-span-1">
                        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent font-poppins mb-2">
                            MovieMania
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Your ultimate destination for discovering movies and TV shows. Explore, rate, and share your favorite entertainment.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">Home</a></li>
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">Trending</a></li>
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">Watchlist</a></li>
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">Categories</a></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Information</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">About Us</a></li>
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">Contact</a></li>
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-lg">
                                📘
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-lg">
                                🐦
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-lg">
                                📷
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-lg">
                                ▶️
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 py-8 sm:py-10">
                    {/* Bottom Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
                            © {currentYear} MovieMania. All rights reserved. Powered by TMDB API.
                        </p>
                        <div className="flex space-x-4 text-gray-500 text-xs sm:text-sm">
                            <a href="/privacy" className="hover:text-purple-400 transition-colors duration-300">Privacy</a>
                            <span>•</span>
                            <a href="/terms" className="hover:text-purple-400 transition-colors duration-300">Terms</a>
                            <span>•</span>
                            <a href="/cookies" className="hover:text-purple-400 transition-colors duration-300">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;