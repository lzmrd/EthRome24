"use client";

import Link from "next/link";

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold ">404</h1>
      <p className="mt-4 text-lg ">What are you looking for?</p>
      <Link href="/courses">
        <button className="btn btn-primary">Go to homepage</button>
      </Link>
    </div>
  );
}
