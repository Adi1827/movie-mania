// Loading skeleton for recommendations
const RecommendationsSkeleton = () => {
  const skeletonItems = new Array(10).fill(null).map((_, index) => ({ id: `skeleton-${index}` }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {skeletonItems.map((item) => (
            <div key={item.id} className="animate-pulse">
                <div className="w-full h-[400px] bg-gray-700 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
        ))}
    </div>
  );
};

export default RecommendationsSkeleton;