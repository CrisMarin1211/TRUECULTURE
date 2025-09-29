export const products = [
  {
    title: '¡Ay que solo estoy!',
    description: 'La linterna',
    image: '/images/product1.png',
    price: 60000,
    type: 'Ticket',
    date: '26/06/2025',
    location: 'Teatro Municipal',
    name: 'Juan Pérez',
    time: '8:00 PM',
    barcodeImage: '/images/barcode.png',
    barcodeCode: 'ABC123456',
  },
  {
    title: 'Concierto del año',
    description: 'Entradas VIP',
    image: '/images/product1.png',
    price: 120000,
    type: 'Ticket',
    date: '10/07/2025',
    location: 'Estadio Central',
    name: 'Carla López',
    time: '9:30 PM',
    barcodeImage: '/images/barcode.png',
    barcodeCode: 'XYZ987654',
  },
];

export const coupons = [
  {
    title: 'Cupón 15%',
    description: 'Aplica para tu próxima compra',
    type: 'percent',
    value: 15,
    code: 'MAV15',
  },
  {
    title: 'Cupón 20%',
    description: 'Descuento en productos seleccionados',
    type: 'percent',
    value: 20,
    code: 'BSC24',
  },
  {
    title: 'Cupón $10.000',
    description: 'Oferta especial',
    type: 'fixed',
    value:10,
    code: 'XWD05',
  },
  {
    title: 'Cupón 5%',
    description: 'Válido este mes',
    type: 'percent',
    value: 5,
    code: 'EVE47',
  },
];
