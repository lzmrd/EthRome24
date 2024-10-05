import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { getSession } from "~~/app/(auth)/action";

const usersFilePath = path.join(process.cwd(), "app/api/users.json");

export async function POST(req: Request) {
  const { email, password }: { email: string; password: string } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "email and password are required" }), { status: 400 });
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

  const user = users.find((user: { email: string; password: string }) => user.email === email);

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }


  const session = await getSession();
  session.isLoggedIn = true;
  session.user = { 
    name : user.name,
    surname : user.surname,
    email : user.email 
   };
  await session.save();

  return new Response(
    JSON.stringify({
      success: true,
      message: "Login successful",
    }),
    { status: 200 },
  );
}
