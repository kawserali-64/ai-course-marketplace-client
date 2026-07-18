export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4">

        {/* Hero */}
        <section className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-cyan-600">
            Contact Us
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Get in Touch with Next Skill AI
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Have questions about our AI courses, instructors, or your learning
            journey? Our team is always ready to help.
          </p>
        </section>

        {/* Contact Info + Form */}
        <section className="mt-14 grid gap-8 lg:grid-cols-2">

          {/* Contact Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-gray-800">
                  Email
                </h3>

                <p className="mt-1 text-gray-600">
                  support@nextskillai.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Phone
                </h3>

                <p className="mt-1 text-gray-600">
                  +880 1700-000000
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Office
                </h3>

                <p className="mt-1 text-gray-600">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Support Hours
                </h3>

                <p className="mt-1 text-gray-600">
                  Saturday – Thursday
                  <br />
                  9:00 AM – 6:00 PM
                </p>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-cyan-600"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-cyan-600"
              />

              <input
                type="text"
                placeholder="Subject"
                className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-cyan-600"
              />

              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-cyan-600"
              />

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-cyan-600 font-semibold text-white transition hover:bg-cyan-700"
              >
                Send Message
              </button>

            </form>
          </div>

        </section>

        {/* FAQ */}
        <section className="mt-16">

          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                How do I enroll in a course?
              </h3>

              <p className="mt-2 text-gray-600">
                Browse our course catalog, open the course details page, and
                enroll in the course that best matches your learning goals.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Can I publish my own course?
              </h3>

              <p className="mt-2 text-gray-600">
                Yes. After signing in, you can add, manage, and remove your own
                AI courses from your dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Are all instructors verified?
              </h3>

              <p className="mt-2 text-gray-600">
                Yes. Every instructor profile is reviewed before courses are
                published to maintain quality and trust.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}