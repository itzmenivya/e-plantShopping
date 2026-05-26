import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
 
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
 
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      let numericCost = parseFloat(item.cost.replace('$', ''));
      totalAmount += item.quantity * numericCost;
    });
    return totalAmount; // BUG FIX 1: moved return inside the function (was outside due to misplaced closing brace)
  };
 
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };
 
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
 
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };
 
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };
 
  // Calculate total cost based on quantity for an individual item
  const calculateTotalCost = (item) => {
    // BUG FIX 2: removed the incorrect forEach loop that shadowed the `item` param
    // and never returned a value. Now correctly computes cost for the given item.
    let numericCost = parseFloat(item.cost.replace('$', ''));
    return (item.quantity * numericCost).toFixed(2);
  };
 
  // BUG FIX 3: handleCheckoutShopping is now wired to the Checkout button below
  const handleCheckoutShopping = (e) => {
    alert('Coming Soon');
  };
 
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        {/* BUG FIX 3: Checkout button now calls handleCheckoutShopping */}
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};
 
export default CartItem;
