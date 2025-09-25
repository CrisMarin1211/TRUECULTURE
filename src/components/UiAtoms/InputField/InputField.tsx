import './InputField.css';

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ label, type = 'text', placeholder, value, onChange }: InputFieldProps) => {
  return (
    <div className="input-field">
      <label className="input-label">{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
