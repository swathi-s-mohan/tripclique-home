const TripListShimmer = () => {
  return (
    <div className="divide-y divide-border">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-4">
          {/* Avatar Shimmer */}
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>

          {/* Trip Info Shimmer */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              {/* Trip Name Shimmer */}
              <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                {/* Timestamp Shimmer */}
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                {/* More Button Shimmer */}
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            {/* Latest Message Shimmer */}
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-[200px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripListShimmer;

