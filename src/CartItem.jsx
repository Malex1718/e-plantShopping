import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calcular el monto total
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const itemCost = parseFloat(item.cost);
      total += itemCost * item.quantity;
    });
    return total.toFixed(2);
  };

  // Continuar comprando
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Checkout
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Incrementar cantidad
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ 
      name: item.name, 
      quantity: item.quantity + 1 
    }));
  };

  // Decrementar cantidad
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity - 1 
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remover item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calcular costo total por item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost);
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart" style={{ textAlign: 'center', padding: '50px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>Your cart is empty</p>
          <button 
            className="continue-shopping-btn" 
            onClick={handleContinueShopping}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px',
              fontSize: '16px'
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                borderBottom: '1px solid #eee',
                gap: '20px'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p style={{ color: '#666' }}>Unit Price: ${item.cost}</p>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <button 
                    onClick={() => handleDecrement(item)}
                    style={{
                      width: '30px',
                      height: '30px',
                      border: '1px solid #ddd',
                      backgroundColor: '#f5f5f5',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    -
                  </button>
                  <span style={{
                    padding: '0 10px',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => handleIncrement(item)}
                    style={{
                      width: '30px',
                      height: '30px',
                      border: '1px solid #ddd',
                      backgroundColor: '#f5f5f5',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    +
                  </button>
                </div>
                
                <div style={{ minWidth: '100px', textAlign: 'right' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
                    ${calculateTotalCost(item)}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleRemove(item)}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          
          <div style={{
            marginTop: '30px',
            padding: '20px',
            borderTop: '2px solid #eee',
            textAlign: 'right'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>
              Total Amount: ${calculateTotalAmount()}
            </h3>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleContinueShopping}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Continue Shopping
              </button>
              <button 
                onClick={handleCheckoutShopping}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;