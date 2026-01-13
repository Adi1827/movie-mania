// Loading skeleton for movie details
const MovieDetailsSkeleton = () => (
  <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-16 animate-pulse">
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/3 p-8 flex justify-center items-center">
        <div className="w-80 h-[480px] bg-gray-700 rounded-2xl"></div>
      </div>
      <div className="lg:w-2/3 p-8 lg:p-12 space-y-6">
        <div className="h-16 bg-gray-700 rounded-lg"></div>
        <div className="h-8 bg-gray-700 rounded-lg w-1/3"></div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieDetailsSkeleton;