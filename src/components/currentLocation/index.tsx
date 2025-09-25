import './style.css';

type CurrentLocationProps = {
  city?: string;
};

const CurrentLocation = ({ city = 'Cali, Colombia' }: CurrentLocationProps) => {
  return (
    <div className="current-location">
      <div className="location-grid">
        <div className="text-left first-row">Current Location</div>
        <div className="arrow">▼</div>
        <div className="text-left second-row">{city}</div>
        <div className="empty"></div>
      </div>
    </div>
  );
};

export default CurrentLocation;
