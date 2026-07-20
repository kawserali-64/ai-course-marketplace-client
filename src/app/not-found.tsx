import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden px-6">
      {/* Cinematic Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        {/* Top Tag */}
        <div className="inline-block border border-gray-800 bg-[#0a0a0a] px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-10 shadow-xl">
          Error: 404 // Access Denied
        </div>

        {/* 404 Big Title */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[220px] font-black text-white italic tracking-tighter leading-[0.8] mb-6 select-none">
            404
          </h1>
          <div className="absolute -top-4 -right-4 w-10 h-10 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 border-b-2 border-l-2 border-cyan-500"></div>
        </div>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-cyan-500 mb-8">
          Navigation Failed
        </h2>

        {/* Description */}
        <p className="mx-auto max-w-md text-gray-500 font-mono text-sm leading-relaxed mb-12 border-l border-gray-900 pl-4">
          THE SPECIFIED SECTOR DOES NOT EXIST. <br/>
          PLEASE RECALIBRATE YOUR COORDINATES.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="w-full sm:w-auto px-12 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-500 transition-all duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/courses"
            className="w-full sm:w-auto px-12 py-4 bg-transparent border border-gray-800 text-white font-black uppercase tracking-widest hover:border-cyan-500 transition-all duration-300"
          >
            Explore Modules
          </Link>
        </div>
      </div>
    </section>
  );
}