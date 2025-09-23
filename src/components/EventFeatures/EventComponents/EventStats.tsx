import type { EventItem } from '../../../types/EventType';
type EventStatsProps = {
  formData: Pick<
    EventItem,
    'price' | 'totalSeats' | 'availableSeats' | 'popularity' | 'expectedAttendance'
  >;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const EventStats: React.FC<EventStatsProps> = ({ formData, onChange }) => (
  <div className="event-form__stats">
    <div>
      <label>Precio</label>
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={onChange}
      />
    </div>
    <div>
      <label>Total de Asientos</label>
      <input
        type="number"
        name="totalSeats"
        placeholder="Total de asientos"
        value={formData.totalSeats}
        onChange={onChange}
      />
    </div>
    <div>
      <label>Asientos disponibles</label>
      <input
        type="number"
        name="availableSeats"
        placeholder="Asientos disponibles"
        value={formData.availableSeats}
        onChange={onChange}
      />
    </div>
    <div>
      <label>Popularidad</label>
      <select name="popularity" value={formData.popularity} onChange={onChange}>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
    </div>
    <div>
      <label>Asistencia esperada</label>
      <input
        type="number"
        name="expectedAttendance"
        placeholder="Asistencia esperada"
        value={formData.expectedAttendance}
        onChange={onChange}
      />
    </div>
  </div>
);

export default EventStats;
