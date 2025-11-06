import React, { useEffect, useState } from 'react';
import StatCard from '../statCard';
import './style.css';
import { supabase } from '../../lib/supabaseClient';
import { getUserProfileByEmail } from '../../services/users';
import { getTotalEvents } from '../../services/events';
import { getTotalProducts } from '../../services/products';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorageIcon from '@mui/icons-material/Storage';
import LabelIcon from '@mui/icons-material/Label';
import StoreIcon from '@mui/icons-material/Store';

interface StatsGridProps {
  onLoaded?: () => void;
}

const StatsGrid: React.FC<StatsGridProps> = ({ onLoaded }) => {
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user?.email) throw new Error('No se pudo obtener el usuario');

        const profile = await getUserProfileByEmail(user.email);
        if (!profile?.organization) throw new Error('El usuario no tiene organización asignada');

        const org = profile.organization;

        const [eventsCount, productsCount] = await Promise.all([
          getTotalEvents(org),
          getTotalProducts(org),
        ]);

        setTotalEvents(eventsCount);
        setTotalProducts(productsCount);
      } catch (err) {
        console.error('Error cargando estadísticas:', err);
      } finally {
        onLoaded?.();
      }
    };

    fetchStats();
  }, [onLoaded]);

  const mockDataSales = [
    { name: 'Lun', value: 5 },
    { name: 'Mar', value: 8 },
    { name: 'Mié', value: 10 },
    { name: 'Jue', value: 13 },
    { name: 'Vie', value: 15 },
    { name: 'Sáb', value: 18 },
    { name: 'Dom', value: 20 },
  ];

  const mockDataTickets = [
    { name: 'Lun', value: 2 },
    { name: 'Mar', value: 5 },
    { name: 'Mié', value: 7 },
    { name: 'Jue', value: 10 },
    { name: 'Vie', value: 11 },
    { name: 'Sáb', value: 13 },
    { name: 'Dom', value: 16 },
  ];

  const mockSalesValue = '$2,450,000';
  const mockTicketsValue = 12;

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
            icon={<ShoppingCartIcon />}
          />
        </div>

        <div className="stat-col">
          <StatCard
            title="Total de Ventas"
            value={mockSalesValue}
            percentage={12.8}
            color="#FF0099"
            chartType="line"
            icon={<StorageIcon />}
            customData={mockDataSales}
          />
        </div>

        <div className="stat-col">
          <StatCard
            title="Total de Entradas Vendidas"
            value={mockTicketsValue}
            percentage={-3.1}
            color="#1177F1"
            chartType="bar"
            icon={<LabelIcon />}
            customData={mockDataTickets}
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
            icon={<StoreIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
