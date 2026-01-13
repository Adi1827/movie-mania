const Shimmer = () => {
    const shimmerItems = new Array(12).fill(null).map((_, i) => ({ id: `shimmer-item-${i}` }));
    
    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-2 sm:px-0">
            {shimmerItems.map((item) => (
                <div key={item.id} className="w-full sm:w-[280px] md:w-[300px] h-[350px] sm:h-[400px] md:h-[500px] rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse"></div>
            ))}
        </div>
    );
};

export default Shimmer;