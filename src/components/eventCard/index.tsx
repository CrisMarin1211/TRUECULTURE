import './style.css';

type EventCardProps = {
  image: string;
  title: string;
  date: string;
  description: string;
};

const EventCard = ({ image, title, date, description, type }: EventCardProps) => {
  return (
    <div className="event-card">
      <div className="event-image">
        <img src={image} alt={title} />
      </div>

      <div className="event-info">
        <p className="event-date">{description}</p>
        <h3 className="event-title">{title}</h3>
        <p className="event-date">{type}</p>
        <p className="event-date">{date}</p>
      </div>

      <div className="event-footer">
        <button className="view-qr-btn">
          Ver QR <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default EventCard;
