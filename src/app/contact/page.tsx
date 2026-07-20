import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white py-20 px-6">
      <div className="mx-auto w-full max-w-6xl">
        
        {/* Hero Section */}
        <section className="text-center mb-20">
          <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm">Contact Us</span>
          <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Get in Touch
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
            Have questions about our AI courses, instructors, or your learning journey? Our team is always ready to help.
          </p>
        </section>

        {/* Contact Info + Form */}
        <section className="grid gap-12 lg:grid-cols-2">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Contact Information</h2>
            <div className="space-y-6">
              {[
                { title: "Email", val: "support@nextskillai.com" },
                { title: "Phone", val: "+880 1700-000000" },
                { title: "Office", val: "Dhaka, Bangladesh" },
                { title: "Support Hours", val: "Saturday – Thursday | 9:00 AM – 6:00 PM" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-[#0a0a0a] border border-gray-800 hover:border-cyan-500/50 transition-colors">
                  <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-2">{item.title}</h3>
                  <p className="text-xl font-semibold">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 md:p-10 rounded-3xl bg-[#0a0a0a] border border-gray-800 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
            <form className="space-y-5">
              {["Full Name", "Email Address", "Subject"].map((placeholder) => (
                <input
                  key={placeholder}
                  type="text"
                  placeholder={placeholder}
                  className="h-14 w-full rounded-2xl bg-[#050505] border border-gray-800 px-6 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              ))}
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-2xl bg-[#050505] border border-gray-800 p-6 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="h-14 w-full rounded-2xl bg-white text-black font-black text-lg hover:bg-cyan-400 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-32">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "How do I enroll?", a: "Browse our course catalog, open the course details page, and enroll." },
              { q: "Publish a course?", a: "Yes, after signing in, you can manage your AI courses from your dashboard." },
              { q: "Are instructors verified?", a: "Yes, every instructor profile is reviewed to maintain quality." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#0a0a0a] border border-gray-800 hover:border-cyan-500/30 transition-all">
                <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}