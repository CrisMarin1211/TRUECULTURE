import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import './EventTags.css';

type EventTagsProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

const EventTags: React.FC<EventTagsProps> = ({ tags, onChange }) => {
  const handleChange = (event: any) => {
    onChange(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth sx={{ mt: 2, mb: 2, minWidth: 200 }}>
      <InputLabel id="tags-label">Tags</InputLabel>
      <Select
        labelId="tags-label"
        multiple
        value={tags}
        onChange={handleChange}
        input={<OutlinedInput label="Tags" />}
      >
        <MenuItem value="Música">Música</MenuItem>
        <MenuItem value="Deporte">Deporte</MenuItem>
        <MenuItem value="Cultura">Cultura</MenuItem>
        <MenuItem value="Tecnología">Tecnología</MenuItem>
      </Select>
    </FormControl>
  );
};

export default EventTags;
