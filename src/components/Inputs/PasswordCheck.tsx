import { useState } from "react";
import PasswordInput from "./PasswordInput";

const PasswordCheck: React.FC<{
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (sex: string) => void;
  required?: boolean;
}> = ({ label, id, name, value, onChange, required = false }) => {
  const [confirmValue, setConfirmValue] = useState("");
  const [text, setText] = useState(value);
  const [isMatch, setIsMatch] = useState(false);
  onChange("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(e.target.value);
    setIsMatch(e.target.value === text);
  };

  return (
    <>
      <PasswordInput
        label={label}
        id={id}
        name={name}
        value={text}
        onChange={handleInputChange}
        required={required}
      />
      <PasswordInput
        label="Confirmar contraseña"
        id={`${id}-confirm`}
        name={`${name}-confirm`}
        value={confirmValue}
        onChange={handleConfirmChange}
        required={required}
        child={
          <p style={{ color: isMatch ? "green" : "red" }}>
            {isMatch
              ? "Las contraseñas coinciden"
              : "Las contraseñas no coinciden"}
          </p>
        }
      />
    </>
  );
};

export default PasswordCheck;
