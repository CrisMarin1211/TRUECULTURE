import './style.css';

type ColoredTextProps = {
  text: string;
  color: '#FF0099' | '#99CB36';
};

const ColoredText = ({ text, color }: ColoredTextProps) => {
  return <div className={`colored-text ${color === '#FF0099' ? 'pink' : 'green'}`}>{text}</div>;
};

export default ColoredText;
