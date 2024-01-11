interface NumberInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  id,
  name,
  value,
  placeholder,
  onChange,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block ">
        {label}:
      </label>
      <div className="w-full">
        <input
          type="number"
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className="w-full border-2 border-slate-300 rounded-lg px-2 py-2 focus:outline-none focus:border-sky-500 mt-2"
        />
      </div>
    </div>
  );
};

export default NumberInput;
