import { NextResponse } from "next/server";
import coursesData from "../../courseData.json";

// Adjust the import path as necessary

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const courseId = parseInt(params.id);
  const course = coursesData.courses.find(course => course.id === courseId);

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}
