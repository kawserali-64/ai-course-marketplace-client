import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">

      {/* Hero */}
      <section className="text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-cyan-600">
          About Us
        </span>

        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Empowering the Future with AI Education
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
          Next Skill AI is an online AI course marketplace where students,
          professionals, and instructors connect to learn the latest Artificial
          Intelligence technologies through high-quality courses.
        </p>
      </section>

      {/* Mission */}
      <section className="mt-16">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Our Mission
        </h2>

        <p className="leading-8 text-gray-600">
          Our mission is to make AI education accessible to everyone by
          providing expert-led courses, practical learning experiences, and a
          trusted platform where instructors can share knowledge with learners
          around the world.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Why Choose Next Skill AI?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Expert Instructors
            </h3>

            <p className="text-gray-600">
              Learn from experienced AI professionals and industry experts.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Practical Learning
            </h3>

            <p className="text-gray-600">
              Gain hands-on experience through real-world AI projects and
              exercises.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Wide Course Collection
            </h3>

            <p className="text-gray-600">
              Explore courses covering Machine Learning, Deep Learning, NLP,
              Computer Vision, and more.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Learn Anywhere
            </h3>

            <p className="text-gray-600">
              Access your favorite AI courses anytime from desktop, tablet, or
              mobile devices.
            </p>
          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="mt-16 rounded-3xl bg-cyan-50 p-10">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">

          <div>
            <h3 className="text-3xl font-extrabold text-cyan-600">
              500+
            </h3>

            <p className="mt-2 text-gray-600">
              AI Courses
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-cyan-600">
              10K+
            </h3>

            <p className="mt-2 text-gray-600">
              Students
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-cyan-600">
              120+
            </h3>

            <p className="mt-2 text-gray-600">
              Expert Instructors
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-cyan-600">
              4.9★
            </h3>

            <p className="mt-2 text-gray-600">
              Average Rating
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">

        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Start Your AI Journey?
        </h2>

        <p className="mt-4 text-gray-600">
          Explore premium AI courses and learn from experienced instructors.
        </p>

        <Link
          href="/courses"
          className="mt-8 inline-block rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          Explore Courses
        </Link>

      </section>

    </main>
  );
}