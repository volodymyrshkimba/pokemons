import { UseFormRegister } from "react-hook-form";
import { FormData } from "./Form";

interface InputProps {
  register: UseFormRegister<FormData>;
  label: string;
  error?: string;
  id: keyof FormData;
}

export default function Input({ register, label, error, id }: InputProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block font-medium ">
        {label}
      </label>
      <input
        id={id}
        type="text"
        {...register(id, {
          required: `${label} is required`,
          minLength: {
            value: 2,
            message: "Minimum length is 2 characters",
          },
          maxLength: {
            value: 12,
            message: "Maximum length is 12 characters",
          },
          pattern: {
            value: /^[a-zA-Z]+$/,
            message: "Only letters (a-z, A-Z) are allowed",
          },
        })}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full h-10"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-[-18px]">
          {error}
        </p>
      )}
    </div>
  );
}
