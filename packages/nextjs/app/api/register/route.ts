import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "app/api/users.json");

export async function POST(req: Request) {
  const { name, surname, email, password }: { name: string; surname: string; email: string; password: string } = await req.json();

  // Controlla i campi obbligatori e restituisci un messaggio specifico per ogni campo mancante
  if (!name) {
    return new Response(
      JSON.stringify({ message: "Name is required" }),
      { status: 400 }
    );
  }
  
  if (!surname) {
    return new Response(
      JSON.stringify({ message: "Surname is required" }),
      { status: 400 }
    );
  }

  if (!email) {
    return new Response(
      JSON.stringify({ message: "Email is required" }),
      { status: 400 }
    );
  }

  if (!password) {
    return new Response(
      JSON.stringify({ message: "Password is required" }),
      { status: 400 }
    );
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

  // Controlla se l'utente esiste già
  const userExists = users.some((user: { email: string }) => user.email === email);
  if (userExists) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
  }

  // Hash della password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Aggiungi il nuovo utente con i parametri richiesti
  users.push({ name, surname, email, password: hashedPassword }); // Salva la password hashata
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}
