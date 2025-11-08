import React from 'react';
import StatCard from '../statCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { EventItem } from '../../types/EventType';
import type { ProductItem } from '../../types/ProductType';
import './style.css';

interface SalesData {
  orders: number;
  revenue: number;
}

interface MetricsModalProps {
  open: boolean;
  onClose: () => void;
  item: EventItem | ProductItem;
  type: 'event' | 'product';
  salesData: SalesData;
}

const MetricsModal: React.FC<MetricsModalProps> = ({ open, onClose, item, type, salesData }) => {
  if (!open) return null;

  const ordersTotal = salesData.orders;
  const revenueTotal = salesData.revenue;
  const revenueFormatted = $${revenueTotal.toLocaleString('es-CO')};

  return (
    <div className="metrics-overlay" onClick={onClose}>
      <div className="metrics-modal" onClick={(e) => e.stopPropagation()}>
        <div className="metrics-header">
          <h3 className="metrics-title">
            Métricas {type === 'event' ? 'del Evento' : 'del Producto'}
          </h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="metrics-body">
          <div className="metrics-left">
            <div className="metrics-left-card">
              <div className="metrics-left-inner">
                <img
                  src={item.image}
                  alt={'name' in item ? item.name : ''}
                  className="metrics-image"
                />
                <h4 className="metrics-name">{'name' in item ? item.name : ''}</h4>
                {type === 'event' && 'date' in item && (
                  <div className="metrics-info-row">
                    <div className="icon-bg">
                      <CalendarTodayIcon sx={{ color: '#99CB36', fontSize: 18 }} />
                    </div>
                    <span>{item.date}</span>
                  </div>
                )}
                {'location' in item && item.location && (
                  <div className="metrics-info-row">
                    <div className="icon-bg">
                      <LocationOnIcon sx={{ color: '#99CB36', fontSize: 18 }} />
                    </div>
                    <span>{item.location}</span>
                  </div>
                )}
                {'description' in item && item.description && (
                  <p className="metrics-desc">{item.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="metrics-right">
            <StatCard
              title="Unidades Vendidas"
              value={ordersTotal}
              percentage={10}
              color="#1177F1"
              chartType="line"
            />
            <StatCard
              title="Ingresos Generados"
              value={revenueFormatted}
              percentage={8}
              color="#FF0099"
              chartType="line"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsModal;