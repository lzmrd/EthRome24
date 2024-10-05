
import React from "react";
import { getSession, logout } from "~~/app/(auth)/action";
import { SessionData } from "~~/app/api/login/auth.types";

export default async function Navbar(){
  const session: SessionData = await getSession();

  async function logoutFunction() {
    "use server"
    await logout();
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">LearnETH</div>
      <div className="flex items-center">
        {session && session.user ? (
          <>
            <p className="mr-4">Welcome back, <b>{session.user?.name}</b></p>
            <form action={logoutFunction}>
              <button className="btn btn-primary" type="submit">
                Logout
              </button>
            </form>
          </>
        ) : (
          <p className="mr-4">Undefined.</p>
        )}
      </div>
    </nav>
  );
};

