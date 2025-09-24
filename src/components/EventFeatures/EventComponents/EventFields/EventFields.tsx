import type { EventItem } from '../../../../types/EventType';
import './EventFields.css';

type EventFieldsProps = {
  formData: Pick<EventItem, 'name' | 'date' | 'time' | 'location' | 'description'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const EventFields: React.FC<EventFieldsProps> = ({ formData, onChange }) => (
  <div className="event-form__fields">
    <input
      type="text"
      name="name"
      placeholder="Nombre del evento"
      value={formData.name}
      onChange={onChange}
    />
    <input type="date" name="date" value={formData.date} onChange={onChange} />
    <input
      type="text"
      name="location"
      placeholder="Lugar"
      value={formData.location}
      onChange={onChange}
    />
    <input type="time" name="time" value={formData.time} onChange={onChange} />
  </div>
);

export default EventFields;
