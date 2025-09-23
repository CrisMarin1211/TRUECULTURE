import './EventTags.css';

type EventTagsProps = {
  tags: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const EventTags: React.FC<EventTagsProps> = ({ tags, onChange }) => (
  <div className="event-form__tags">
    <select multiple name="tags" value={tags} onChange={onChange}>
      <option value="Música">Música</option>
      <option value="Deporte">Deporte</option>
      <option value="Cultura">Cultura</option>
      <option value="Tecnología">Tecnología</option>
    </select>
  </div>
);

export default EventTags;
