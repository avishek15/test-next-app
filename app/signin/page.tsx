"use client";
import { login } from "@/appwrite-services/appwrite-actions";
import SignupButton from "@/components/signupButton";
import React from "react";
import { useFormState } from "react-dom";

const Login = () => {
  const [state, action] = useFormState(login, {
    success: false,
    errors: {},
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        // onSubmit={handleSubmit}
        action={action}
        className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>

          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            type="text"
            id="email"
            name="email"
            required
          />
          {/* {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )} */}
          {state?.errors?.email && (
            <p className="text-red-500 text-xs italic">{state.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline           }`}
            type="password"
            id="password"
            name="password"
            required
          />
          {/* {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )} */}
          {state?.errors?.password && (
            <p className="text-red-500 text-xs italic">
              {state.errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <SignupButton label="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
