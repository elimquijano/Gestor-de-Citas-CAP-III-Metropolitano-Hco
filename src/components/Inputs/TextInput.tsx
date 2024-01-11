interface TextInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; // Agrega esta línea
  placeholder :string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false, // Agrega esta línea
}) => {
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
        onChange={onChange}
        required={required} // Agrega esta línea
        className="w-full border-2 border-slate-300 rounded-lg px-2 py-2 focus:outline-none focus:border-sky-500 mt-2"
        placeholder ={placeholder} 
      />
    </div>
  );
};

export default TextInput;
