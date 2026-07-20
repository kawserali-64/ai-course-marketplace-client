"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    shortDescription: string;
    image: string;
    price: number;
    category: string;
    instructor: string;
    rating: number;
    students: number;
    level: string;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="group flex h-[460px] w-full flex-col overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-cyan-600 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            {course.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-1 text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
          {course.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
          {course.shortDescription}
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-500">
          <FaChalkboardTeacher className="text-cyan-500" />
          {course.instructor}
        </div>

        {/* Stats */}
        <div className="my-5 grid grid-cols-3 gap-2 rounded-xl bg-[#050505] py-3 px-2 border border-gray-800">
          <div className="text-center">
            <FaStar className="mx-auto mb-1 text-amber-400" />
            <p className="text-xs font-bold text-white">{course.rating}</p>
          </div>
          <div className="border-x border-gray-800 text-center">
            <FaUserGraduate className="mx-auto mb-1 text-cyan-500" />
            <p className="text-xs font-bold text-white">{course.students.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Level</p>
            <p className="text-[11px] font-bold text-white truncate px-1">{course.level}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <h3 className="text-2xl font-black text-white">
              ${course.price}
            </h3>
          </div>

          <Link
            href={`/courses/${course._id}`}
            className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;