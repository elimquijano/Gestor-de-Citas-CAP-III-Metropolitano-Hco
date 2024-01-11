import React, { useEffect, useState } from 'react';

interface Option {
  id: string;
  nombre: string;
}

interface SelectInputProps {
  label: string;
  id: string;
  name: string;
  value: { id: string; nombre: string };
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


const SelectInput: React.FC<SelectInputProps> = ({ label, id, name, value, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value.id);

  useEffect(() => {
    setSelectedValue(value.id);
  }, [value.id]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    onChange(e);
  };

  
  return (
    <div className="w-full">
      <label className="block" htmlFor={id}>
        {label}
      </label>
      <select
        className="w-full border-2 border-slate-300 rounded-lg px-2 py-2 focus:outline-none focus:border-sky-500 mt-2"
        id={id}
        name={name}
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option disabled value="">
          Seleccionar...
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
