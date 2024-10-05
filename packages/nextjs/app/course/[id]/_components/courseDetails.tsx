"use client"
import { Fragment, useEffect, useState } from "react";
import YouTubeStyleVideoPlayer from "./videoPlayer";
import { issueCourseCompletionCertificate } from "~~/app/crossmint/issueCertificate";
import Link from "next/link";

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
  userEmail: string;
}

export default function CourseDetails({ courseId, userEmail }: CourseDetailsProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [objCertificate, setObjCertificate] = useState<any>(null)
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

  async function certificateCourseCompletation() {
    const res = await issueCourseCompletionCertificate(userEmail, course?.title ?? "", "success", "2034-01-01");
    setObjCertificate(res)
  }

  return (
    <Fragment>
      <div className="card w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="card-body p-6">
          <span className="badge badge-primary text-white px-4 py-2">{course.category}</span>
          <div className="border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>
          <YouTubeStyleVideoPlayer videoUrl={course.urlVideo} certificateCourseCompletation={certificateCourseCompletation} />
        </div>
      </div>

      {objCertificate && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold">Congratulations</h2>
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{objCertificate}</span>
            </div>
            <Link href="/courses">
              <button className="btn w-full mt-2 btn-primary">
                Go back to courses
              </button>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
}
