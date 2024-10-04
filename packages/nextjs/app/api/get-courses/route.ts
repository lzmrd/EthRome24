import { NextResponse } from "next/server";
import coursesData from "../courseData.json";

// Adjust the import path as necessary

export async function GET() {
  return NextResponse.json(coursesData);
}
