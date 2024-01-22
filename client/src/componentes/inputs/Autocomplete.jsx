import React, { useState, useRef } from "react";
import Input from "./Input";

function Autocomplete({ options, onOptionSelected, placeholder }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef(null);

const handleChange = (e) => {
    const userInput = e.currentTarget.value;

    if (userInput.trim() === '') {
        setFilteredOptions([]);
        setShowOptions(false);
    } else {
        const filteredOptions = options.filter(
            (option) =>
                option.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setFilteredOptions(filteredOptions);
        setShowOptions(true);
    }

    setInputValue(userInput);
};

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (value) => {
    setInputValue(value.label);
    setShowOptions(false);
    onOptionSelected(value);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={ref}>
      <Input type="text" value={inputValue} onChange={handleChange} placeholder={placeholder} />
      {showOptions && (
        <div className="z-10 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {filteredOptions.map((option, i) => (
              <li className="cursor-pointer hover:bg-slate-700 p-2 rounded-lg hover:text-gray-200" key={i} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
