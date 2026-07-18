import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaStar,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaArrowLeft,
  FaInfoCircle,
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


// Fetch Course
async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    return res.json();

  } catch (error) {
    return null;
  }
}


// Fetch Related Courses
async function getRelatedCourses(
  id: string
): Promise<RelatedCourse[]> {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}/related`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.courses || [];

  } catch (error) {
    return [];
  }
}



export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const course = await getCourse(id);


  if (!course) {
    return notFound();
  }


  const relatedCourses = await getRelatedCourses(id);


  const features = [
    "Lifetime Access",
    "Industry Level Projects",
    "Certificate Included",
    "Expert Instructor Support",
  ];


  return (
    <section className="min-h-screen bg-gray-50 py-10 md:py-16">

      <div className="mx-auto w-full max-w-6xl px-4">


        {/* Back Button */}
        <Link
          href="/courses"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-cyan-700 hover:underline"
        >
          <FaArrowLeft />
          Back To Courses
        </Link>



        {/* Header */}
        <div className="mb-10">

          <span className="rounded-lg bg-cyan-600/10 px-4 py-1 text-sm font-bold uppercase tracking-wide text-cyan-700">
            {course.category}
          </span>


          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            {course.title}
          </h1>


          <div className="mt-5 flex flex-wrap gap-6 text-gray-600">

            <span className="flex items-center gap-2">
              <FaChalkboardTeacher className="text-cyan-600" />
              {course.instructor}
            </span>


            <span className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              {course.rating}
            </span>


            <span className="flex items-center gap-2">
              <FaUserGraduate className="text-cyan-600" />
              {course.students} Students
            </span>

          </div>

        </div>




        {/* Hero Image */}
        <div className="relative mb-12 h-[350px] overflow-hidden rounded-[2rem] shadow-2xl md:h-[600px]">

          <Image
            src={course.image}
            alt={course.title}
            fill
            priority
            className="object-cover"
          />

        </div>





        <div className="grid gap-10 lg:grid-cols-3">



          {/* Left */}
          <div className="space-y-8 lg:col-span-2">


            {/* Overview */}
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">

              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">

                <FaInfoCircle className="text-cyan-600" />

                Course Overview

              </h2>


              <p className="text-lg leading-relaxed text-gray-600">
                {course.description}
              </p>

            </div>





            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">


              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">

                <FaStar className="mx-auto mb-3 text-2xl text-yellow-400" />

                <h3 className="text-xl font-bold">
                  {course.rating}
                </h3>

                <p className="text-xs font-bold uppercase text-gray-400">
                  Rating
                </p>

              </div>



              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">

                <FaUserGraduate className="mx-auto mb-3 text-2xl text-cyan-600" />

                <h3 className="text-xl font-bold">
                  {course.students}
                </h3>

                <p className="text-xs font-bold uppercase text-gray-400">
                  Students
                </p>

              </div>



              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">

                <FaChalkboardTeacher className="mx-auto mb-3 text-2xl text-cyan-600" />

                <h3 className="text-xl font-bold">
                  {course.level}
                </h3>

                <p className="text-xs font-bold uppercase text-gray-400">
                  Level
                </p>

              </div>


            </div>





            {/* Features */}
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">

              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Course Highlights
              </h2>


              <div className="grid gap-4 md:grid-cols-2">

                {features.map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 font-medium text-gray-600"
                  >

                    <FaCheckCircle className="text-cyan-600" />

                    {item}

                  </div>

                ))}

              </div>

            </div>


          </div>







          {/* Sidebar */}
          <div>

            <div className="sticky top-24 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl">


              <p className="text-gray-500">
                Course Price
              </p>


              <h2 className="mb-8 mt-2 text-5xl font-extrabold text-cyan-700">
                ${course.price}
              </h2>



              <div className="rounded-2xl bg-gray-50 p-6 text-center">


                <button
                  className="
                  w-full
                  rounded-xl
                  bg-cyan-600
                  py-4
                  font-bold
                  text-white
                  transition
                  hover:bg-cyan-700
                  "
                >
                  Enroll Now
                </button>


              </div>


            </div>

          </div>


        </div>





        {/* Related Courses */}
        {relatedCourses.length > 0 && (

          <section className="mt-16">


            <h2 className="mb-8 text-3xl font-extrabold text-gray-900">
              Related Courses
            </h2>



            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">


              {relatedCourses.map((item) => (

                <div
                  key={item._id}
                  className="overflow-hidden rounded-3xl border bg-white shadow-md"
                >

                  <div className="relative h-52">

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />

                  </div>



                  <div className="p-5">


                    <h3 className="text-xl font-bold">
                      {item.title}
                    </h3>


                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {item.shortDescription}
                    </p>


                    <p className="mt-4 text-lg font-bold text-cyan-700">
                      ${item.price}
                    </p>



                    <Link
                      href={`/courses/${item._id}`}
                      className="
                      mt-5
                      block
                      rounded-xl
                      bg-cyan-600
                      py-3
                      text-center
                      font-bold
                      text-white
                      hover:bg-cyan-700
                      "
                    >
                      View Details
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