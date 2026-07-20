import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-20">
      
      {/* Hero Section */}
      <section className="text-center mb-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px]"></div>
        <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm">About Us</span>
        <h1 className="mt-6 text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          Next Skill AI
        </h1>
        <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Crafting the next generation of AI engineers through a premium, cinematic learning experience.
        </p>
      </section>

      {/* Cards Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Expert Led", desc: "Industry-grade curriculum." },
          { title: "Project Based", desc: "Build real AI solutions." },
          { title: "Smart Tracks", desc: "Curated learning paths." },
          { title: "Global Scale", desc: "Learn from anywhere." }
        ].map((item, i) => (
          <div key={i} className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-gray-800 to-transparent hover:from-cyan-500 hover:to-transparent transition-all duration-500">
            <div className="bg-[#0a0a0a] p-8 rounded-[22px] h-full hover:bg-[#111] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center mb-6 border border-gray-800 text-cyan-400 group-hover:scale-110 transition-transform">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Stats - Cinematic Style */}
      <section className="max-w-5xl mx-auto my-32 border border-gray-800 bg-[#0a0a0a] rounded-[3rem] p-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: "500+", label: "Courses" },
            { val: "10K+", label: "Students" },
            { val: "120+", label: "Mentors" },
            { val: "4.9", label: "Rating" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-5xl font-black mb-2 text-white">{stat.val}</div>
              <div className="text-cyan-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <Link
          href="/courses"
          className="group relative inline-flex items-center px-12 py-5 bg-white text-black font-black text-lg rounded-full hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(34,211,238,0.4)]"
        >
          Explore Courses
          <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </section>
    </main>
  );
}