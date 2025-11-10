import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

interface OrderStatusData {
  label: string;
  value: number;
  total: number;
  color: string;
}

interface OrderSummaryCardProps {
  title?: string;
  orders: {
    pending: number;
    delivered: number;
    shipped: number;
    total: number;
  };
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  title = 'Resumen de Pedidos',
  orders,
}) => {
  const data: OrderStatusData[] = [
    {
      label: 'Pedidos Pendientes',
      value: orders.pending,
      total: orders.total,
      color: '#1177F1',
    },
    {
      label: 'Pedidos Entregados',
      value: orders.delivered,
      total: orders.total,
      color: '#FF0099',
    },
    {
      label: 'Pedidos Enviados',
      value: orders.shipped,
      total: orders.total,
      color: '#99CB36',
    },
  ];

  return (
    <Card
      sx={{
        backgroundColor: '#232323',
        color: 'white',
        borderRadius: '16px',
        border: '1px solid #666',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        height: '100%',
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" sx={{ color: '#ccc', mb: 2 }}>
          {title}
        </Typography>

        {data.map((item) => {
          const percent = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0;

          return (
            <Box key={item.label} sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {item.label}
              </Typography>

              <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                {`${item.value}/${item.total} pedidos (${percent}%)`}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#444',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: item.color,
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;