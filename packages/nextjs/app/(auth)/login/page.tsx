import { useRouter } from "next/navigation";
import LoginForm from "./_component/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return <LoginForm />;
}
