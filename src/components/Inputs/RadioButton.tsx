interface RadioButtonProps<T> {
  label: string;
  value: T;
  selectedValue: T | null;
  onSelectionChange: (value: T) => void;
}

const RadioButton = <T extends any>({
  label,
  value,
  selectedValue,
  onSelectionChange,
}: RadioButtonProps<T>) => {
  const isSelected = value === selectedValue;

  const handleRadioChange = () => {
    if (!isSelected) {
      onSelectionChange(value);
    }
  };

  return (
    <label
      className="flex items-center cursor-pointer"
      onClick={handleRadioChange}
    >
      <div
        className={`w-5 h-5 border border-blue-500 rounded-full mr-2 ${
          isSelected ? "bg-blue-500" : ""
        }`}
      >
        {isSelected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mx-auto my-auto text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.293 9.293a1 1 0 011.414 0L12 14.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
            />
          </svg>
        )}
      </div>
      {label}
    </label>
  );
};
export default RadioButton;
