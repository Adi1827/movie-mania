import { useEffect, useState } from "react";
import posterHolder from '../assets/img/poster-holder.jpg';

const MovieCard = ({ ...movieItem }) => {
    const [movieGenre, setMovieGenre] = useState(movieItem?.genre_ids);

    useEffect(() => {
        genreList();
    }, [])

    async function genreList() {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=44867af4999a85b16e0ca84faa75a376");
        const list_genre = await response.json();
        //list_genre = genres:{0:{id:"0",name:"Action"},...}
        const genreList = list_genre?.genres?.map((item) => item)
        // MovieGenre Filtering and Setting the names from id
        setMovieGenre(genreList.filter((id) => movieItem?.genre_ids?.includes(id.id)));
    }

    return (
        <>
            {/* Import Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <div className="w-full sm:w-[280px] md:w-[300px] h-auto backdrop-blur-xl bg-white/10 border border-white/20 overflow-hidden rounded-2xl shadow-2xl hover:shadow-purple-500/25 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group font-inter flex flex-col">
                {/* Movie Poster */}
                <div className="relative overflow-hidden">
                    <img
                        src={(movieItem.poster_path !== null && movieItem.poster_path !== undefined) ? "https://image.tmdb.org/t/p/w500/" + movieItem?.poster_path : posterHolder}
                        className='w-full h-[250px] sm:h-[280px] md:h-[350px] lg:h-[400px] object-cover transition-all duration-500 group-hover:scale-110'
                        alt="Movie Poster"
                        loading='lazy'
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Rating Badge */}
                    {movieItem.vote_average && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-2 py-1 rounded-lg text-sm shadow-lg">
                            ⭐ {movieItem.vote_average.toFixed(1)}
                        </div>
                    )}

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-all duration-300">
                            <span className="text-white text-2xl ml-1">▶️</span>
                        </div>
                    </div>
                </div>

                {/* Movie Information */}
                <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 flex-grow flex flex-col">
                    {/* Movie Title */}
                    <h2 className="text-white font-bold text-lg sm:text-base md:text-xl font-poppins leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                        {movieItem.title ? movieItem.title : movieItem.name}
                    </h2>

                    {/* Release Year */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-purple-400 font-semibold text-base sm:text-sm md:text-lg font-inter">
                            {movieItem?.release_date?.split('-')[0] || movieItem?.first_air_date?.split('-')[0] || 'N/A'}
                        </span>

                        {/* Movie Type Badge */}
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-white text-sm font-medium">
                            {movieItem.title ? '🎬 Movie' : '📺 TV Show'}
                        </span>
                    </div>

                    {/* Genres */}
                    <div className="space-y-2">
                        <h4 className="text-gray-300 font-medium text-xs sm:text-xs md:text-sm font-inter">Genres:</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {movieGenre?.slice(0, 2).map((genre, index) => (
                                <span
                                    key={genre.id}
                                    className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-xs font-medium hover:bg-white/20 transition-colors duration-300"
                                >
                                    {genre.name}
                                </span>
                            ))}
                            {movieGenre?.length > 2 && (
                                <span className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-400 text-xs font-medium">
                                    +{movieGenre.length - 2} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Overview Preview */}
                    {movieItem.overview && (
                        <p className="text-gray-300 text-xs sm:text-xs md:text-sm font-inter leading-relaxed line-clamp-2 sm:line-clamp-2 md:line-clamp-3">
                            {movieItem.overview}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2 mt-auto">
                        <button className="flex-1 px-2 sm:px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-white text-xs sm:text-xs md:text-sm font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                            ❤️ Watchlist
                        </button>
                        <button className="px-2 sm:px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                            📤
                        </button>
                    </div>
                </div>

                {/* Bottom Gradient Border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Custom Styles */}
            <style>{`
                .font-inter {
                    font-family: 'Inter', sans-serif;
                }
                .font-poppins {
                    font-family: 'Poppins', sans-serif;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
}

export default MovieCard;
