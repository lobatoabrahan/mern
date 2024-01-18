import React from "react";

const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  step
}) => {
  return (
    <div className="mb-2">
      
      <input
        type={type}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        step={step}
      />
    </div>
  );
};

export default Input;
