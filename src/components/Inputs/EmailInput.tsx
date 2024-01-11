interface EmailInputProps {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
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
        type="email"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-2 border-slate-300 rounded-lg px-2 py-2 focus:outline-none focus:border-sky-500 mt-2"
      />
    </div>
  )
}

export default EmailInput
