import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import RecommendationsSkeleton from "./RecommendationsSkeleton";

const MovieInfo = () => {
  const { id } = useParams();
  const [movieDetails, setmovieDetails] = useState();
  const [moreLikeData, setMoreLikeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);

  window.scroll({ top: 0, left: 100, behavior: "instant" });

  useEffect(() => {
    setLoading(true);
    setRecommendationsLoading(true);
    moreLikeThis();
    fetchId();
  }, [id]);

  const apiError = (mssg) => {
    toast.error(mssg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
      }
    });
  }

  useEffect(() => {
    document.title = movieDetails?.title || 'Movie';
  }, [movieDetails]);

  async function moreLikeThis() {
    try {
      setRecommendationsLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1&api_key=44867af4999a85b16e0ca84faa75a376`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      // Filter out movies without poster_path
      const filteredResults = json.results?.filter(movie => movie.poster_path !== null) || [];
      setMoreLikeData(filteredResults);
      setRecommendationsLoading(false);
    }
    catch (err) {
      console.error("There was error fetching recommendations\n", err);
      apiError("Error fetching recommendations");
      setRecommendationsLoading(false);
    }
  }

  const fetchId = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=44867af4999a85b16e0ca84faa75a376`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      if (!json.title) {
        apiError("Movie not found");
        return;
      }
      setmovieDetails(json);
      setLoading(false);
    }
    catch (err) {
      console.error("Error fetching movie details:", err);
      apiError("Error fetching movie details");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-inter">
      {/* Import Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Movie Details Section */}
          {loading ? (
            <MovieDetailsSkeleton />
          ) : (
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-16">
              <div className="flex flex-col lg:flex-row">
                {/* Movie Poster */}
                <div className="lg:w-1/3 p-8 flex justify-center items-center">
            <div className="relative group">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
                alt={movieDetails?.title}
                className="w-full h-auto object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Rating Badge */}
              {movieDetails?.vote_average && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                  ⭐ {movieDetails.vote_average.toFixed(1)}
                </div>
              )}
            </div>
                </div>

                {/* Movie Information */}
              <div className="lg:w-2/3 p-8 lg:p-12">
                <div className="space-y-8">
                  {/* Title */}
                  <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-poppins leading-tight">
                    {movieDetails?.title}
                  </h1>

                  {/* Release Year */}
                  <div className="flex items-center space-x-4">
                    <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl shadow-lg">
                      {movieDetails?.release_date?.split('-')[0]}
                    </h3>

                    {/* Additional Info */}
                    <div className="flex items-center space-x-4 text-gray-300">
                      {movieDetails?.runtime && (
                        <span className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-lg">
                          <span>⏱️</span>
                          <span>{movieDetails.runtime} min</span>
                        </span>
                      )}
                      {movieDetails?.genres && movieDetails.genres.length > 0 && (
                        <span className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-lg">
                          <span>🎭</span>
                          <span>{movieDetails.genres[0]?.name}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-white font-poppins">Overview</h4>
                    <p className="text-lg text-gray-300 leading-relaxed font-inter max-w-4xl">
                      {movieDetails?.overview || "No overview available for this movie."}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-6">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                      ▶️ Watch Trailer
                    </button>
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                      ❤️ Add to Watchlist
                    </button>
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                      📤 Share
                    </button>
                  </div>

                  {/* Additional Details */}
                  {movieDetails && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                      <div className="space-y-3">
                        <h5 className="text-lg font-semibold text-purple-400">Release Date</h5>
                        <p className="text-gray-300">{movieDetails.release_date || 'N/A'}</p>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-lg font-semibold text-purple-400">Language</h5>
                        <p className="text-gray-300 uppercase">{movieDetails.original_language || 'N/A'}</p>
                      </div>
                      {movieDetails.budget > 0 && (
                        <div className="space-y-3">
                          <h5 className="text-lg font-semibold text-purple-400">Budget</h5>
                          <p className="text-gray-300">${movieDetails.budget.toLocaleString()}</p>
                        </div>
                      )}
                      {movieDetails.revenue > 0 && (
                        <div className="space-y-3">
                          <h5 className="text-lg font-semibold text-purple-400">Revenue</h5>
                          <p className="text-gray-300">${movieDetails.revenue.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-poppins mb-4">
              You might also like
            </h2>
            <p className="text-xl text-gray-300 font-inter">Discover more movies similar to this one</p>
          </div>

          {(() => {
            let recommendationsContent;
            if (recommendationsLoading) {
              recommendationsContent = <RecommendationsSkeleton />;
            } else if (moreLikeData && moreLikeData.length > 0) {
              recommendationsContent = (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                  {moreLikeData.map((element, index) => {
                    // Skip movies without poster
                    if (!element.poster_path) return null;

                    return (
                      <Link
                        to={`/Movies/${element.id}`}
                        key={`${element.id}-${index}`}
                        className="group transform hover:scale-105 transition-all duration-300"
                        style={{
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-purple-500/25">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                            alt={element.title || "Recommended Movie"}
                            className="w-full h-[400px] object-cover transition-transform duration-500 rounded-2xl"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-4 left-4 right-4 text-white font-semibold text-lg truncate">
                            {element.title || element.name}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            } else {
              recommendationsContent = (
                <div className="text-center text-gray-400 text-lg">
                  No similar movies found.
                </div>
              );
            }
            return recommendationsContent;
          })()}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;