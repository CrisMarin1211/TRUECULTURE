import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export interface ProductStatus {
  id: number;
  name: string;
  city: string;
  date: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
}

interface ProductsStatusCardProps {
  title?: string;
  products: ProductStatus[];
}

const statusColors: Record<ProductStatus['status'], string> = {
  Pending: '#1177F1',
  'In Transit': '#FF0099',
  Delivered: '#99CB36',
};

const ProductsStatusCard: React.FC<ProductsStatusCardProps> = ({
  title = 'Estado de Productos',
  products,
}) => {
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

        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              border: '1px solid #99CB36',
              borderRadius: '8px',
              padding: '10px 14px',
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', color: '#fff', lineHeight: 1.2 }}
              >
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                {product.city}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: '#ddd',
              }}
            >
              {product.date}
            </Typography>

            <Box
              sx={{
                backgroundColor: statusColors[product.status],
                borderRadius: '12px',
                textAlign: 'center',
                padding: '4px 0',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {product.status}
            </Box>
          </Box>
        ))}

        {products.length === 0 && (
          <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mt: 4 }}>
            No hay productos disponibles
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductsStatusCard;