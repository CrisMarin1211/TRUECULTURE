import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  percentage: number;
  color: string;
  chartType: 'bar' | 'line' | 'area';
}

const mockData = [
  { name: 'Lun', value: 10 },
  { name: 'Mar', value: 14 },
  { name: 'Mié', value: 12 },
  { name: 'Jue', value: 18 },
  { name: 'Vie', value: 15 },
  { name: 'Sáb', value: 22 },
  { name: 'Dom', value: 17 },
];

const StatCard: React.FC<StatCardProps> = ({ title, value, percentage, color, chartType }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#232323',
        color: 'white',
        borderRadius: '16px',
        border: '1px solid #666',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" sx={{ color: '#ccc', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: percentage >= 0 ? '#1177F1' : '#FF0099',
            fontWeight: '500',
            mb: 1,
          }}
        >
          {percentage > 0 ? `▲ ${percentage}%` : `▼ ${Math.abs(percentage)}%`}
        </Typography>
        <div style={{ width: '100%', height: 100 }}>
          <ResponsiveContainer>
            {chartType === 'bar' && (
              <BarChart data={mockData}>
                <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
                <Tooltip contentStyle={{ background: '#222', color: '#fff' }} />
              </BarChart>
            )}
            {chartType === 'line' && (
              <LineChart data={mockData}>
                <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
                <Tooltip contentStyle={{ background: '#222', color: '#fff' }} />
              </LineChart>
            )}
            {chartType === 'area' && (
              <AreaChart data={mockData}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  fill={color}
                  fillOpacity={0.3}
                />
                <Tooltip contentStyle={{ background: '#222', color: '#fff' }} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
