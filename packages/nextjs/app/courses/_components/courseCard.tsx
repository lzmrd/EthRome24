import React from "react";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  durationHours: number;
  mode: string;
  language: string;
}

export default function CourseCard({ course }: { course: Course }) {
  function getLevelStyle(level: string) {
    switch (level) {
      case "Beginner":
        return "badge-success text-white";
      case "Intermediate":
        return "badge-warning ";
      case "Advanced":
        return "badge-error text-white";
      default:
        return "badge-secondary";
    }
  }
  return (
    <div className="p-6 border rounded shadow-lg bg-base-100 flex flex-col justify-between h-full">
      
      <div className="flex items-center gap-4 mb-2">
        <span className="badge badge-primary text-white px-4 py-2">{course.category}</span>
        <span className={`badge ${getLevelStyle(course.level)} px-4 py-2`}>{course.level}</span>
      </div>

      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
        <p className="mb-4 text-base text-gray-600">{course.description}</p>
      </div>

      
      <div className="mt-auto">
        <Link href={`/course/${course.id}`}>
          <button className="btn btn-primary w-full">Detail</button>
        </Link>
      </div>
    </div>
  );
}
