export default function Loading() {
  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Search & Filter Skeleton */}
        <div className="grid md:grid-cols-4 gap-4 mb-10 animate-pulse">
          <div className="h-12 rounded-xl bg-gray-200"></div>
          <div className="h-12 rounded-xl bg-gray-200"></div>
          <div className="h-12 rounded-xl bg-gray-200"></div>
          <div className="h-12 rounded-xl bg-gray-200"></div>
        </div>

        {/* House Card Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm animate-pulse"
            >
              {/* Image */}
              <div className="h-56 bg-gray-200"></div>

              <div className="p-5 space-y-4">

                {/* Category */}
                <div className="h-5 w-24 rounded bg-gray-200"></div>

                {/* Title */}
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 rounded bg-gray-200"></div>
                  <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                </div>

                {/* Meta */}
                <div className="flex justify-between">
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                  <div className="h-4 w-16 rounded bg-gray-200"></div>
                </div>

                {/* Button */}
                <div className="h-11 rounded-xl bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}