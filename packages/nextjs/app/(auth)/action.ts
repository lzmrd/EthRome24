"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { defaultSession, sessionOptions } from "../api/login/auth.types";
import { getIronSession } from "iron-session";

export const getSession = async () => {
  const session = await getIronSession<any>(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const setNewParamSession = async (param: { name: string; value: string }) => {
  const session = await getSession();
  session[param.name] = param.value;
  await session.save();
};

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}
