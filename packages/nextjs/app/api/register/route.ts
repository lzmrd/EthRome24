import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "app/api/users.json");

export async function POST(req: Request) {
  const { username, password }: { username: string; password: string } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: "Username and password are required" }), { status: 400 });
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

  const userExists = users.some((user: { username: string }) => user.username === username);
  if (userExists) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
  }

  users.push({ username, password }); //TODO: add hasing password
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}
