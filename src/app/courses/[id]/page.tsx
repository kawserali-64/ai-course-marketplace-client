import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaStar,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  price: number;
  category: string;
  instructor: string;
  rating: number;
  students: number;
  level: string;
}

interface RelatedCourse {
  _id: string;
  title: string;
  shortDescription: string;
  image: string;
  price: number;
  category: string;
  rating: number;
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

async function getRelatedCourses(id: string): Promise<RelatedCourse[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}/related`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.courses || [];
  } catch (error) {
    return [];
  }
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) return notFound();
  
  const relatedCourses = await getRelatedCourses(id);

  return (
    <section className="min-h-screen bg-[#050505] py-16 text-white selection:bg-cyan-500/30">
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Navigation */}
        <Link href="/courses" className="mb-10 inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-cyan-500 transition-colors">
          <FaArrowLeft />  BACK_TO_CATALOG
        </Link>

        {/* Hero Section */}
        <div className="relative mb-20">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-6">
                {course.category}
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8 italic">
                {course.title}
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
                {course.shortDescription}
              </p>
              
              <div className="flex gap-8 border-t border-gray-900 pt-8">
                {[
                  { icon: FaChalkboardTeacher, val: course.instructor, label: "Instructor" },
                  { icon: FaStar, val: course.rating, label: "Rating" },
                  { icon: FaUserGraduate, val: `${course.students}+`, label: "Students" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 text-white font-bold mb-1">
                      <item.icon className="text-cyan-500" /> {item.val}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] border border-gray-900 p-2 bg-[#0a0a0a]">
              <Image src={course.image} alt={course.title} fill className="object-cover" priority />
              <div className="absolute inset-0 border border-white/10" />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="border-l border-gray-900 pl-8">
              <h3 className="text-3xl font-black tracking-tight mb-6 uppercase tracking-widest text-white">Course Architecture</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{course.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-900 bg-[#0a0a0a] p-8">
              <div className="text-sm text-gray-500 mb-2 uppercase tracking-widest">Investment</div>
              <div className="text-6xl font-black mb-8">${course.price}</div>
              <button className="w-full bg-cyan-500 text-black font-black py-4 uppercase tracking-widest hover:bg-white transition-all">
                ENROLL NOW
              </button>
              
              <div className="mt-8 pt-8 border-t border-gray-900 space-y-4">
                {["Lifetime Access", "Industry Projects", "Certificate Included"].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-400 font-mono">
                    <FaCheckCircle className="text-cyan-500" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="mt-24 pt-16 border-t border-gray-900">
            <h2 className="mb-12 text-3xl font-black uppercase tracking-[0.2em] text-white">Related Modules</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {relatedCourses.map((item) => (
                <div key={item._id} className="group border border-gray-900 bg-[#0a0a0a] p-1 transition-all hover:border-cyan-500/50">
                  <div className="relative h-48 mb-4">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{item.shortDescription}</p>
                    <Link href={`/courses/${item._id}`} className="block w-full border border-gray-800 py-2 text-center text-xs font-bold uppercase tracking-widest text-white hover:bg-cyan-500 hover:text-black transition-all">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}