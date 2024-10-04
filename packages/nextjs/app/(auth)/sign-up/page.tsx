import SignupForm from "./_components/signupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

export default function Signup() {
  return <SignupForm />;
}
