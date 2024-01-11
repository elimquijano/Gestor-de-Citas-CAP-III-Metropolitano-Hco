// Inválido

import React, { useState } from "react";

interface SuggestionInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  suggestions: string[];
}

const SuggestionInput: React.FC<SuggestionInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  suggestions,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [inputFocused, setInputFocused] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    let newValue: string;

    if (typeof event === "string") {
      newValue = event;
    } else {
      newValue = event.target.value;
    }

    // Actualiza el valor del campo de entrada
    onChange(newValue);

    // Filtra las sugerencias basadas en lo que el usuario ha escrito
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(newValue.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    // Cuando se selecciona una sugerencia, actualiza el valor del campo de entrada
    onChange(suggestion);

    // Borra las sugerencias filtradas y oculta la lista de sugerencias
    setFilteredSuggestions([]);
    setInputFocused(false);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block">
        {label}:
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        className="w-full border-2 border-slate-300 rounded-lg px-2 py-2 focus:outline-none focus:border-sky-500 mt-2"
      />
      {inputFocused && filteredSuggestions.length > 0 && (
        <ul className="">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-1"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionInput;
