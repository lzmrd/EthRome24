import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { getSession } from "~~/app/(auth)/action";

const usersFilePath = path.join(process.cwd(), "app/api/users.json");

export async function POST(req: Request) {
  const { username, password }: { username: string; password: string } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: "Username and password are required" }), { status: 400 });
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

  const user = users.find((user: { username: string; password: string }) => user.username === username);

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }

  const { email, name, surname, id } = user;

  const session = await getSession();
  session.isLoggedIn = true;
  session.user = { id, name, email };
  await session.save();

  return new Response(
    JSON.stringify({
      success: true,
      message: "Login successful",
      email,
      name,
      surname,
      id,
    }),
    { status: 200 },
  );
}
