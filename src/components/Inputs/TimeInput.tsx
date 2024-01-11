interface TimeInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block">
        {label}:
      </label>
      <input
        type="time"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-2 border-slate-300 rounded-lg px-2 py-2 mt-2"
      />
    </div>
  );
};

export default TimeInput;
