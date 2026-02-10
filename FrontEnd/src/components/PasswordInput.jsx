import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ value, onChange, name, placeholder }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-3">
      <input
        type={show ? "text" : "password"}
        name={name} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full p-2 pr-10 border rounded
          bg-white text-black
          dark:bg-gray-700 dark:text-white
          dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="
          absolute right-2 top-2.5
          text-gray-500 dark:text-gray-300
          hover:text-gray-700 dark:hover:text-white
        "
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;
