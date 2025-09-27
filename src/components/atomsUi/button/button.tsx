import './button.css';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const Button = ({ label, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="btn">
      {label}
    </button>
  );
};

export default Button;
