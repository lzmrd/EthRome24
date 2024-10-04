"use client";

import { useEffect, useState } from "react";
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

export default function DetailCourse({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/get-course/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data: Course = await response.json();
        setCourse(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mt-8">
        <Link href="/courses">
          <button className="btn btn-primary">Back to Courses</button>
        </Link>
      </div>
      <h1 className="text-4xl font-bold my-4">{course.title}</h1>
      <p className="text-lg mb-2">{course.description}</p>
      <ul className="space-y-2">
        <li>
          <strong>Category:</strong> {course.category}
        </li>
        <li>
          <strong>Level:</strong> {course.level}
        </li>
        <li>
          <strong>Duration:</strong> {course.durationHours} hours
        </li>
        <li>
          <strong>Mode:</strong> {course.mode}
        </li>
        <li>
          <strong>Language:</strong> {course.language}
        </li>
      </ul>
    </div>
  );
}
