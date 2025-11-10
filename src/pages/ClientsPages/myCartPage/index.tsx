import { useState } from 'react';
import Header from '../../../components/header';
import './style.css';
import ProductCard from '../../../components/productCard';
import CheckoutSummary from '../../../components/checkoutSummary';
import SeatSelection from '../../../components/seatSelection';
import { useCart } from '../../../context/CartContex';
import { useEvent } from '../../../context/EventContext';

const MyCartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, updateCartItemSeats } = useCart();
  const { events } = useEvent();
  const [editingSeatItemId, setEditingSeatItemId] = useState<string | number | null>(null);
  const [seatModalOpen, setSeatModalOpen] = useState(false);

  const getEventInfo = (itemId: string | number) => {
    const event = events.find(e => String(e.id) === String(itemId));
    if (event && event.has_seating) {
      return {
        eventId: Number(event.id),
        totalSeats: event.totalseats,
        availableSeats: event.availableseats
      };
    }
    return null;
  };

  const handleRemoveItem = (itemId: string | number) => {
    removeFromCart(itemId);
  };

  const handleEditSeats = (itemId: string | number) => {
    setEditingSeatItemId(itemId);
    setSeatModalOpen(true);
  };

  const handleConfirmSeats = (seats: string[]) => {
    if (editingSeatItemId && seats.length > 0) {
      updateCartItemSeats(editingSeatItemId, seats);
    }
    setSeatModalOpen(false);
    setEditingSeatItemId(null);
  };

  const handleCloseSeatModal = () => {
    setSeatModalOpen(false);
    setEditingSeatItemId(null);
  };

  const editingItem = editingSeatItemId
    ? cartItems.find(item => item.id === editingSeatItemId)
    : null;

  const eventInfo = editingItem ? getEventInfo(editingSeatItemId!) : null;

  return (
    <>
      <Header />
      <div className="my-cart-page">
        <div className="cart-header">
          <h1 className="cart-title">Carrito</h1>
          <p className="cart-subtitle">Los productos de la cesta de la compra no están reservados</p>
        </div>
        <div className="cart-content">
          <div className="products-column">
            {cartItems.length ? (
              cartItems.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  quantity={product.quantity}
                  seats={product.seats}
                  onQuantityChange={(q) => updateQuantity(product.id, q)}
                  onRemove={() => handleRemoveItem(product.id)}
                  onEditSeats={
                    product.seats && product.seats.length > 0
                      ? () => {
                          const event = events.find(e => String(e.id) === String(product.id));
                          if (event && event.has_seating) {
                            handleEditSeats(product.id);
                          }
                        }
                      : undefined
                  }
                />
              ))
            ) : (
              <div className="empty-cart">
                <p>Tu carrito está vacío 🛒</p>
              </div>
            )}
          </div>
          <div className="checkout-column">
            <CheckoutSummary />
          </div>
        </div>
      </div>

      {editingItem && eventInfo && (
        <SeatSelection
          open={seatModalOpen}
          onClose={handleCloseSeatModal}
          onConfirm={handleConfirmSeats}
          eventId={eventInfo.eventId}
          totalSeats={eventInfo.totalSeats}
          availableSeats={eventInfo.availableSeats}
          bookedSeats={editingItem.seats || []}
        />
      )}
    </>
  );
};

export default MyCartPage;
