import React from "react";
import Spinner from "./spinner";
import { useFormStatus } from "react-dom";

const SignupButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  // console.log("Pending state:", pending);

  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full relative flex items-center justify-center"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <Spinner /> <span className="ml-2">Submitting...</span>
        </div>
      ) : (
        label || ""
      )}
    </button>
  );
};

export default SignupButton;
