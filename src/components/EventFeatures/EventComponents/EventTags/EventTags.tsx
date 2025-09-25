import React from 'react';
import './EventTags.css';

type EventTagsProps = {
  tags: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  open: boolean;
  toggleOpen: () => void;
};

const availableOptions = ['Música', 'Deporte', 'Cultura', 'Tecnología'];

const EventTags: React.FC<EventTagsProps> = ({ tags, onChange, open, toggleOpen }) => {
  return (
    <div className="event-form__tags">
      <div
        className="selected-tags"
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleOpen()}
      >
        {tags.length === 0 ? (
          <span className="placeholder">Selecciona etiquetas</span>
        ) : (
          tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))
        )}
      </div>

      {open && (
        <select
          multiple
          name="tags"
          value={tags}
          onChange={onChange}
          className="multi-select"
          size={availableOptions.length}
        >
          {availableOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default EventTags;
