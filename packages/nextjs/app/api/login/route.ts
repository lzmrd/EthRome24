import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "app/api/users.json");

export async function POST(req: Request) {
  const { username, password }: { username: string; password: string } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: "Username and password are required" }), { status: 400 });
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

  const user = users.find((user: { username: string; password: string }) => user.username === username);

  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
  }

  // Confronto della password fornita con l'hash memorizzato
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
  }

  return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
}
