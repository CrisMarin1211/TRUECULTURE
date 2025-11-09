import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import type { ProductTagStats } from '../../types/ProductType';

interface ProductTagsChartProps {
  title?: string;
  data: ProductTagStats[];
}

const COLORS = ['#475922', '#99CB36', '#CDE889', '#6A7B36', '#A6C14C'];

const ProductTagsChart: React.FC<ProductTagsChartProps> = ({
  title = 'Tags más vendidos',
  data,
}) => {
  const chartData = data.map((tag) => ({
    name: tag.tag,
    value: tag.percent,
    count: tag.count,
  }));

  const renderLabel = (props: PieLabelRenderProps) => {
    const { x, y, name, value } = props;
    const numericValue = Number(value);
    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {${name}: ${isNaN(numericValue) ? 0 : numericValue.toFixed(0)}%}
      </text>
    );
  };

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
        <Typography variant="subtitle2" sx={{ color: '#ccc', mb: 3 }}>
          {title}
        </Typography>

        <div style={{ width: '100%', height: 240, marginBottom: 24 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="100%"
                paddingAngle={2}
                label={renderLabel}
              >
                {chartData.map((entry, index) => (
                  <Cell key={cell-${index}} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [${value.toFixed(1)}%, name]}
                contentStyle={{ background: '#222', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: 16 }}>
          {data.map((t) => (
            <Typography key={t.tag} variant="body2" sx={{ color: '#ccc', mb: 0.5 }}>
              {t.tag} — {t.count} vendidos ({t.percent.toFixed(1)}%)
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductTagsChart;