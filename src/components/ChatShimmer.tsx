const ChatShimmer = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background flex flex-col">
        {/* Header Shimmer */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="p-4 flex items-center gap-3 relative">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          {/* Tabs Shimmer */}
          <div className="flex border-b border-border">
            <div className="flex-1 py-3 px-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
            </div>
            <div className="flex-1 py-3 px-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Messages Shimmer */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Welcome Message Shimmer */}
          <div className="mb-4">
            <div className="flex gap-3 mb-4 items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Chat Messages Shimmer */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="mb-4">
              <div className="flex gap-3 mb-4 items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-10"></div>
                  </div>
                  <div className={`h-10 bg-gray-200 rounded-lg animate-pulse ${index % 2 === 0 ? 'w-3/4' : 'w-full'}`}></div>
                </div>
              </div>
            </div>
          ))}

          {/* Destination Card Shimmer */}
          <div className="mb-4">
            <div className="flex gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-10"></div>
                </div>
              </div>
            </div>
            <div className="ml-11">
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Shimmer */}
        <div className="px-4 py-2 border-t border-border">
          <div className="flex gap-2 justify-center">
            <div className="h-8 bg-gray-200 rounded-full animate-pulse w-20"></div>
            <div className="h-8 bg-gray-200 rounded-full animate-pulse w-20"></div>
          </div>
        </div>

        {/* Message Input Shimmer */}
        <div className="p-4 pt-2">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatShimmer;

