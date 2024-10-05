"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(formRef.current as HTMLFormElement);
      const formEmail = formData.get("email") as string;
      const formPassword = formData.get("password") as string;

      const bodyObj = {
        username: formEmail,
        password: formPassword,
      };

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObj),
      });

      const result = await response.json();

      if (response.status !== 200) {
        setErrorMessage(result.message || "Login failed");
        setIsSubmitLoading(false);
        return;
      }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
    } finally {
      router.push("/courses");
      location.reload();
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input type="email" id="email" name="email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input input-bordered pr-10 w-full"
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={isSubmitLoading}>
                {isSubmitLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
