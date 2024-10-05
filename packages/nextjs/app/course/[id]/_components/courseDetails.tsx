import { useEffect, useState } from "react";

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

interface CourseDetailsProps {
  courseId: string;
}

export default function CourseDetails({ courseId }: CourseDetailsProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const response = await fetch(`/api/get-course/${courseId}`);
          if (!response.ok) {
            throw new Error("Course not found");
          }
          const data: Course = await response.json();
          setCourse(data);
        } catch (error: any) {
          setError(error.message || "An error occurred while fetching the course.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourse();
    }
  }, [courseId]);

  if (isLoading) {
    return <div>Loading course details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="card w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="card-body p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{course.title}</h2>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="border-t border-gray-300 mt-4 pt-4">
            <p className="text-gray-800">
              <strong>Category:</strong> {course.category}
            </p>
            <p className="text-gray-800">
              <strong>Level:</strong> {course.level}
            </p>
            <p className="text-gray-800">
              <strong>Duration:</strong> {course.durationHours} hours
            </p>
            <p className="text-gray-800">
              <strong>Mode:</strong> {course.mode}
            </p>
            <p className="text-gray-800">
              <strong>Language:</strong> {course.language}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
