import { useMemo, useEffect } from 'react';
import type { EventItem } from '../../../types/EventType';

type EventImageProps = {
  imageFile?: EventItem['imageFile'];
  image: EventItem['image'];
  name: EventItem['name'];
};

const EventImage: React.FC<EventImageProps> = ({ imageFile, image, name }) => {
  const objectUrl = useMemo(() => {
    if (imageFile instanceof File) return URL.createObjectURL(imageFile);
    return null;
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  if (imageFile instanceof File) return <img src={objectUrl ?? undefined} alt={name} />;
  if (image)
    return (
      <img
        src={image}
        alt={name}
        width={218}
        height={140}
        style={{ borderRadius: 14, objectFit: 'cover' }}
      />
    );
  return null;
};

export default EventImage;
