
import Link from "next/link";
import CourseDetails from "./_components/courseDetails";
import { getSession } from "~~/app/(auth)/action";

export default async function DetailCourse({ params }: { params: { id: string } }) {

  const session = await getSession();
  return (
    <div className="container mx-auto p-4">
      <div className="mt-8">
        <Link href="/courses">
          <button className="btn btn-primary">Back to Courses</button>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <CourseDetails courseId={params.id} userEmail={session.user.email}/>
      </div>
    </div>
  );
}
