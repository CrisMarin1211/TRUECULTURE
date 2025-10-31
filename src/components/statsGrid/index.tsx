import React, { useEffect, useState } from 'react';
import StatCard from '../statCard';
import './style.css';
import { getTotalEvents } from '../../services/events';
import { getTotalProducts } from '../../services/products';

const StatsGrid: React.FC = () => {
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [eventsCount, productsCount] = await Promise.all([
          getTotalEvents(),
          getTotalProducts(),
        ]);
        console.log('Eventos Totales:', eventsCount);
        console.log('Productos Totales:', productsCount);
        setTotalEvents(eventsCount);
        setTotalProducts(productsCount);
      } catch (err) {
        console.error('Error cargando estadísticas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-grid">
        <p className="loading-text">Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className="stats-grid">
      <div className="stats-row">
        <div className="stat-col">
          <StatCard
            title="Eventos Totales"
            value={totalEvents}
            percentage={5.3}
            color="#1177F1"
            chartType="area"
          />
        </div>
        <div className="stat-col">
          <StatCard
            title="Ventas Totales"
            value="$2,450,000"
            percentage={12.8}
            color="#FF0099"
            chartType="line"
          />
        </div>
        <div className="stat-col">
          <StatCard
            title="Entradas Vendidas"
            value={835}
            percentage={-3.1}
            color="#1177F1"
            chartType="bar"
          />
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-col">
          <StatCard
            title="Productos Totales"
            value={totalProducts}
            percentage={8.4}
            color="#FF0099"
            chartType="area"
          />
        </div>
        <div className="stat-col">
          <StatCard
            title="Ventas Totales"
            value="$2,450,000"
            percentage={12.8}
            color="#FF0099"
            chartType="line"
          />
        </div>
        <div className="stat-col">
          <StatCard
            title="Entradas Vendidas"
            value={835}
            percentage={-3.1}
            color="#1177F1"
            chartType="bar"
          />
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
