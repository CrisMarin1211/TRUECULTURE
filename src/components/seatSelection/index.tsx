import { useState, useEffect, useMemo, useRef } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';
import { getEventSeats } from '../../services/seats';

export interface Seat {
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
}

interface SeatSelectionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (seats: string[]) => void;
  eventId: number;
  totalSeats: number;
  availableSeats: number;
  bookedSeats?: string[]; // Array de asientos ya reservados como "A1", "A2", etc.
}

const SeatSelection = ({ 
  open, 
  onClose, 
  onConfirm, 
  eventId,
  totalSeats, 
  availableSeats: _availableSeats,
  bookedSeats = [] 
}: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [seatStatuses, setSeatStatuses] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const hasInitialized = useRef(false);
  const previousBookedSeats = useRef<string>('');

  // Cargar asientos reservados desde la base de datos
  useEffect(() => {
    const loadSeats = async () => {
      if (!open || !eventId) return;
      
      setLoading(true);
      try {
        const seats = await getEventSeats(eventId);
        const reserved = new Set<string>();
        
        seats.forEach(seat => {
          if (seat.is_reserved) {
            reserved.add(seat.seat_number);
          }
        });
        
        setSeatStatuses(reserved);
      } catch (error) {
        console.error('Error cargando asientos:', error);
        setSeatStatuses(new Set<string>()); // Permite seleccionar asientos incluso si falla la carga
      } finally {
        setLoading(false);
      }
    };

    loadSeats();
  }, [open, eventId]);

  // Inicializar asientos seleccionados cuando se abre el modal
  useEffect(() => {
    if (!open) {
      // Limpiar selección cuando se cierra el modal
      setSelectedSeats(new Set());
      hasInitialized.current = false;
      previousBookedSeats.current = '';
      return;
    }
    
    // Inicializar asientos seleccionados cuando se abre el modal
    // Solo inicializar si es la primera vez que se abre o si los bookedSeats han cambiado
    const bookedSeatsKey = bookedSeats ? [...bookedSeats].sort().join(',') : '';
    
    if (!hasInitialized.current || previousBookedSeats.current !== bookedSeatsKey) {
      if (bookedSeats && bookedSeats.length > 0) {
        setSelectedSeats(new Set(bookedSeats));
      } else {
        setSelectedSeats(new Set());
      }
      hasInitialized.current = true;
      previousBookedSeats.current = bookedSeatsKey;
    }
  }, [open, bookedSeats]);

  // Generar la grilla de asientos tipo cine (memoizado para mejor performance)
  const seats = useMemo(() => {
    const rows = Math.ceil(totalSeats / 10); // 10 asientos por fila
    const seatsArray: Seat[][] = [];

    for (let i = 0; i < rows; i++) {
      const rowLetter = String.fromCharCode(65 + i); // A, B, C, etc.
      const seatsInRow: Seat[] = [];

      for (let j = 1; j <= 10; j++) {
        const seatNumber = i * 10 + j;
        if (seatNumber > totalSeats) break;

        const seatId = `${rowLetter}${j}`;
        seatsInRow.push({
          row: rowLetter,
          number: j,
          isAvailable: !seatStatuses.has(seatId),
          isSelected: false,
        });
      }

      if (seatsInRow.length > 0) {
        seatsArray.push(seatsInRow);
      }
    }

    return seatsArray;
  }, [totalSeats, seatStatuses]);

  const handleSeatClick = (row: string, number: number) => {
    const seatId = `${row}${number}`;
    
    // Encontrar el asiento en la grilla
    const seat = seats
      .flat()
      .find(s => s.row === row && s.number === number);

    if (!seat || !seat.isAvailable) return;

    const newSelected = new Set(selectedSeats);
    
    if (newSelected.has(seatId)) {
      newSelected.delete(seatId);
    } else {
      newSelected.add(seatId);
    }

    setSelectedSeats(newSelected);
  };

  const handleConfirm = () => {
    if (selectedSeats.size === 0) return;
    onConfirm(Array.from(selectedSeats).sort());
    setSelectedSeats(new Set());
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
      }}
    >
      <Box className="seat-selection-modal">
        <div className="seat-selection-header">
          <h2 className="seat-selection-title">Selecciona tus asientos</h2>
          <IconButton onClick={onClose} sx={{ color: '#FFFFFF' }}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="seat-selection-content">
          {/* Stage */}
          <div className="seat-screen">
            <span>ESCENARIO</span>
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8692A6' }}>
              Cargando disponibilidad de asientos...
            </div>
          ) : (
            <>
              {/* Seat Map */}
              <div className="seat-map">
                {seats.map((row, rowIndex) => (
                  <div key={rowIndex} className="seat-row">
                    <span className="row-label">{row[0].row}</span>
                    <div className="seat-row-seats">
                      {row.map((seat) => {
                        const seatId = `${seat.row}${seat.number}`;
                        const isSelected = selectedSeats.has(seatId);
                        
                        return (
                          <button
                            key={seatId}
                            className={`seat ${seat.isAvailable ? 'available' : 'occupied'} ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSeatClick(seat.row, seat.number)}
                            disabled={!seat.isAvailable}
                          >
                            {seat.number}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="seat-legend">
                <div className="legend-item">
                  <div className="legend-seat available" />
                  <span>Disponible</span>
                </div>
                <div className="legend-item">
                  <div className="legend-seat selected" />
                  <span>Seleccionado</span>
                </div>
                <div className="legend-item">
                  <div className="legend-seat occupied" />
                  <span>Ocupado</span>
                </div>
              </div>

              {/* Summary */}
              {selectedSeats.size > 0 && (
                <div className="seat-summary">
                  <p className="summary-text">
                    {selectedSeats.size} asiento{selectedSeats.size > 1 ? 's' : ''} seleccionado{selectedSeats.size > 1 ? 's' : ''}: {Array.from(selectedSeats).sort().join(', ')}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="seat-selection-footer">
          <button className="seat-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="seat-btn-confirm" 
            onClick={handleConfirm}
            disabled={selectedSeats.size === 0 || loading}
          >
            Confirmar {selectedSeats.size > 0 && `(${selectedSeats.size})`}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default SeatSelection;

