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
    <div className="p-6 border rounded shadow-lg bg-base-100">
      <div className="mb-2">
        <span className="badge badge-primary text-white px-4 py-2">{course.category}</span>
      </div>
      <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
      <p className="mb-4 text-base text-gray-600">{course.description}</p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className={`badge mr-2 ${getLevelStyle(course.level)}`}>{course.level}</span>
        </div>
        <div>
          <strong>Duration:</strong> {course.durationHours} hours
        </div>
      </div>

      <Link href={`/course/${course.id}`}>
        <button className="btn btn-primary w-full">Detail</button>
      </Link>
    </div>
  );
}
