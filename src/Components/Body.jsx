import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./Moviecard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);
  const [sortButton, setSortButton] = useState("visible");
  let [pageValue, setPageValue] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortMovies, setSortMovies] = useState("popularity");
  const [searchTimer, setSearchTimer] = useState("");

  useEffect(() => {
    if (searchText === "") fetchData();
    else searchData();
    document.title = "MovieMania";
    window.scroll({ top: 0, left: 100, behavior: "smooth" });
  }, [pageValue, sortMovies, searchTimer]);

  useEffect(() => {
    if (searchText === "") {
      setSortButton("visible");
      setFilteredMovie(movieList);
    } else setSortButton("hidden");

    const timer = setTimeout(() => {
      setSearchTimer(searchText);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const searchData = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/search/multi?query=" +
          searchTimer +
          "&language=en-US&page=" +
          pageValue +
          "&api_key=44867af4999a85b16e0ca84faa75a376"
      );
      const json = await response.json();
      setFilteredMovie(json.results);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=" +
          pageValue +
          "&region=US&sort_by=" +
          sortMovies +
          ".desc&api_key=44867af4999a85b16e0ca84faa75a376"
      );
      const json = await response.json();
      setMovieList(json.results);
      setTotalPages(json.total_pages);
      setFilteredMovie(json.results);
    } catch (err) {
      console.log(err);
    }
  };

  const [pageInput, setPageInput] = useState("");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-inter overflow-x-hidden">
      {/* Import Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Search and Filter Section - Added relative and z-40 to the wrapper */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 relative z-40">
          <div className="backdrop-blur-xl bg-slate-800/30 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center justify-center w-full">
              {/* Search Input */}
              <input
                className="w-full lg:w-96 h-12 sm:h-14 px-4 sm:px-6 rounded-xl bg-slate-800/50 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                type="search"
                placeholder="Search movies..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.trimStart())}
              />

            {/* Sort Dropdown */}
            {sortButton === "visible" && (
                <div className="relative w-full lg:w-72">
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-slate-800/40 backdrop-blur-lg text-white cursor-pointer hover:bg-slate-800/50 transition-all duration-200 border border-white/10 shadow-md hover:shadow-lg">
                            <span className="flex items-center gap-2 text-sm sm:text-base font-medium">
                                {sortMovies === "popularity"
                                    ? "🔥 Trending Now"
                                    : sortMovies === "primary_release_date"
                                    ? "📅 Latest Releases"
                                    : sortMovies === "vote_count"
                                    ? "⭐ Top Rated"
                                    : "💰 Box Office Hits"}
                            </span>
                            <svg
                                className="w-4 h-4 opacity-90 transition-transform duration-300 group-open:rotate-180"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 8l4 4 4-4"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </summary>

                        {/* THE FIX: Increased opacity to 90% and intensified blur */}
                    <ul
                      className="absolute left-0 right-0 mt-2 w-full 
               bg-slate-900/90 backdrop-blur-2xl 
               rounded-xl p-2 
               shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
               border border-white/20 
               space-y-2 origin-top 
               transition-all duration-300 ease-out 
               group-open:animate-dropdown z-50"
                    >
                      <li
                        onClick={(e) => {
                          setSortMovies("popularity");
                          e.currentTarget.closest("details").open = false;
                        }}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm text-white ${
                          sortMovies === "popularity"
                            ? "bg-purple-600/50 ring-1 ring-purple-400"
                            : ""
                        }`}
                      >
                        <span className="flex items-center gap-2 font-bold">
                          <span>🔥</span>
                          <span>Trending Now</span>
                        </span>
                        {sortMovies === "popularity" && (
                          <span className="text-green-300 font-semibold">
                            ✓
                          </span>
                        )}
                      </li>

                      <li
                        onClick={(e) => {
                          setSortMovies("primary_release_date");
                          e.currentTarget.closest("details").open = false;
                        }}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm text-white ${
                          sortMovies === "primary_release_date"
                            ? "bg-purple-600/50 ring-1 ring-purple-400"
                            : ""
                        }`}
                      >
                        <span className="flex items-center gap-2 font-bold">
                          <span>📅</span>
                          <span>Latest Releases</span>
                        </span>
                        {sortMovies === "primary_release_date" && (
                          <span className="text-green-300 font-semibold">
                            ✓
                          </span>
                        )}
                      </li>

                      <li
                        onClick={(e) => {
                          setSortMovies("vote_count");
                          e.currentTarget.closest("details").open = false;
                        }}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm text-white ${
                          sortMovies === "vote_count"
                            ? "bg-purple-600/50 ring-1 ring-purple-400"
                            : ""
                        }`}
                      >
                        <span className="flex items-center gap-2 font-bold">
                          <span>⭐</span>
                          <span>Top Rated</span>
                        </span>
                        {sortMovies === "vote_count" && (
                          <span className="text-green-300 font-semibold">
                            ✓
                          </span>
                        )}
                      </li>

                      <li
                        onClick={(e) => {
                          setSortMovies("revenue");
                          e.currentTarget.closest("details").open = false;
                        }}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm text-white ${
                          sortMovies === "revenue"
                            ? "bg-purple-600/50 ring-1 ring-purple-400"
                            : ""
                        }`}
                      >
                        <span className="flex items-center gap-2 font-bold">
                          <span>💰</span>
                          <span>Box Office Hits</span>
                        </span>
                        {sortMovies === "revenue" && (
                          <span className="text-green-300 font-semibold">
                            ✓
                          </span>
                        )}
                      </li>
                    </ul>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Movies Grid or Loading */}
        {(() => {
          let content;
          if (filteredMovie?.length === 0 && movieList?.length === 0) {
            content = (
              <div className="backdrop-blur-xl bg-slate-800/20 rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10">
                <Shimmer />
              </div>
            );
          } else if (filteredMovie?.length === 0) {
            content = (
              <div className="text-center text-white py-16 sm:py-24">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                  No Results Found
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  Try different keywords or explore trending movies!
                </p>
              </div>
            );
          } else {
            content = (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 px-2 sm:px-0">
                {filteredMovie?.map((movie) => (
                  <Link
                    to={`/movies/${movie.id}`}
                    key={movie.id}
                    className="hover:scale-105 transition-transform duration-300 flex justify-center"
                  >
                    <MovieCard key={movie.id} {...movie} />
                  </Link>
                ))}
              </div>
            );
          }
          return content;
        })()}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 mb-12 sm:mb-16 flex-wrap px-2 sm:px-0">
          <button
            className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base whitespace-nowrap"
            onClick={() => setPageValue((prev) => Math.max(1, prev - 1))}
            disabled={pageValue === 1}
          >
            ⬅ Previous
          </button>
          <div className="flex gap-1 sm:gap-2 items-center flex-wrap">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const num = parseInt(pageInput);
                  if (num > 0 && num <= totalPages) {
                    setPageValue(num);
                    setPageInput("");
                  } else {
                    alert(
                      `Please enter a valid page number between 1 and ${totalPages}`
                    );
                  }
                }
              }}
              placeholder="Go to page..."
              className="w-20 sm:w-32 px-2 sm:px-3 py-2 bg-slate-800/50 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-base"
            />
            <span className="text-white font-semibold bg-slate-800/50 px-2 sm:px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 text-xs sm:text-base whitespace-nowrap">
              Page {pageValue} of {totalPages}
            </span>
          </div>
          <button
            className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            onClick={() => setPageValue((prev) => prev + 1)}
            disabled={pageValue === totalPages}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
