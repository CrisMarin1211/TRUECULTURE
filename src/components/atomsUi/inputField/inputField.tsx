import './inputField.css';

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
};

const InputField = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  disabled = false 
}: InputFieldProps) => {
  return (
    <div className="input-field">
      <label className="input-label">{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
