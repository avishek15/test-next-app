"use client";
import React from "react";
import { useFormState } from "react-dom";
import { signup } from "@/appwrite-services/appwrite-actions";
import SignupButton from "@/components/signupButton";

const SignupForm = () => {
  const [state, action] = useFormState(signup, {
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
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            type="text"
            id="username"
            name="username"
            required
          />
          {/* {errors.username && (
            <p className="text-red-500 text-xs italic">{errors.username}</p>
          )} */}
          {state?.errors?.username && (
            <p className="text-red-500 text-xs italic">
              {state.errors.username}
            </p>
          )}
        </div>
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            Confirm Password:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline}`}
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
          />
          {/* {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.confirmPassword}
            </p>
          )} */}
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <SignupButton label="Register" />
        </div>
      </form>
    </div>
  );
};

// export function SignupButton() {
//   const { pending } = useFormStatus();
//   // console.log("Pending state:", pending);

//   return (
//     <button
//       type="submit"
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full relative flex items-center justify-center"
//       disabled={pending}
//     >
//       {pending ? (
//         <div className="flex items-center justify-center">
//           <Spinner /> <span className="ml-2">Submitting...</span>
//         </div>
//       ) : (
//         "Sign up"
//       )}
//     </button>
//   );
// }

export default SignupForm;
