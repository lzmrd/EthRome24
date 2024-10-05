import React from "react";
import { getSession, logout } from "~~/app/(auth)/action";

export default async function UserInfo() {
  const session = await getSession();
  const userObj = session.user;

  return userObj ? (
    <>
      <p>
        Welcome back <b>{userObj.name} </b>
      </p>
      <form action={logout}>
        <button className="btn btn-primary" type="submit">
          Logout
        </button>
      </form>
    </>
  ) : (
    <p>Loading...</p>
  );
}
