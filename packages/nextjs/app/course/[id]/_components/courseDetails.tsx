"use client"
import { useEffect, useState } from "react";
import YouTubeStyleVideoPlayer from "./videoPlayer";
import { issueCourseCompletionCertificate } from "~~/app/crossmint/issueCertificate";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  durationHours: number;
  urlVideo: string,
  mode: string;
  language: string;
}

interface CourseDetailsProps {
  courseId: string;
  userEmail:string;
}

export default function CourseDetails({ courseId,userEmail }: CourseDetailsProps) {
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

  async function certificateCourseCompletation(){
  
    const test = await issueCourseCompletionCertificate(userEmail, course?.title ?? "", "success", "2034-01-01");
    console.log(test)
  }

  return (
    <div className="card w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="card-body p-6">
        <span className="badge badge-primary text-white px-4 py-2">{course.category}</span>
        <div className="border-t border-gray-300 mt-4 pt-4">
          <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
          <p className="text-gray-700">{course.description}</p>
        </div>
        <YouTubeStyleVideoPlayer videoUrl={course.urlVideo} certificateCourseCompletation={certificateCourseCompletation}/>
      </div>
    </div>
  );
}
