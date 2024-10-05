"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    width: "w-0",
    color: "bg-transparent",
  });
  const getPasswordStrength = (password: string) => {
    let strength = "";
    let width = "w-0";
    let color = "bg-transparent";

    if (password.length === 0) {
      strength = "None";
      width = "w-0";
      color = "bg-red-600";
    } else if (password.length < 10) {
      strength = "Medium";
      width = "w-3/4";
      color = "bg-yellow-500";
    } else if (password.length < 10) {
      strength = "Medium";
      width = "w-3/4";
      color = "bg-yellow-500";
    } else {
      strength = "Strong";
      width = "w-4/4";
      color = "bg-green-600";
    }

    return { strength, width, color };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "password") {
      setPasswordStrength(getPasswordStrength(e.target.value));
    }
  };

  async function submitSignupForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("The passwords do not match!");
      setIsSubmitLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      } else {
        //TODO: Redirect
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Signup</h2>
          <form onSubmit={submitSignupForm}>
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="surname">
                <span className="label-text">Surname</span>
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
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
                  value={formData.password}
                  onChange={handleChange}
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
              <div
                className={`${passwordStrength.width} ${passwordStrength.color} mt-2 h-2 rounded transition-all duration-300`}
              ></div>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input input-bordered pr-10 w-full"
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Confirm signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
