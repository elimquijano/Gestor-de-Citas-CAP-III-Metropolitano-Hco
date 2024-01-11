import RadioButton from "./RadioButton";

interface RadioButtonGroupProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelectionChange: (sex: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  options,
  selectedOption,
  onSelectionChange,
}) => {
  return (
    <div className="flex flex-col w-full justify-between gap-2">
      <label>{label}</label>
      <div className="flex flex-col md:flex-row gap-3">
        {options.map((option, index) => (
          <RadioButton
            key={index}
            label={option}
            value={option}
            selectedValue={selectedOption}
            onSelectionChange={onSelectionChange}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
