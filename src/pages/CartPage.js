import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col, Card, Alert, Form } from 'react-bootstrap';

const CartPage = () => {
  // Initialize cart state from localStorage
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // Discount for promo code
  const [promoError, setPromoError] = useState(''); // For promo code error message
  const [orderPlaced, setOrderPlaced] = useState(false); // To show order confirmation

  // Valid promo codes
  const validPromoCodes = ['23', '45', '78', '99'];

  // Update the localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate total amount with promo code discount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedAmount = Math.max(totalAmount - discount, 0); // Prevent going below 0

  // Handle adding items to the cart
  const addToCart = (item) => {
    const itemExists = cart.find((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Handle updating quantity
  const updateQuantity = (itemId, quantityChange) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + quantityChange, 1) }
          : item
      )
    );
  };

  // Handle removing items from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleRemoveItem = (item) => {
    setItemToRemove(item);
    setShowModal(true);
  };

  const confirmRemove = () => {
    removeFromCart(itemToRemove.id); // Remove item from cart
    setShowModal(false);
  };

  // Apply promo code
  const handlePromoCode = () => {
    if (validPromoCodes.includes(promoCode)) {
      setPromoError('');
      // Set the discount based on the promo code
      switch (promoCode) {
        case '23':
          setDiscount(23);
          break;
        case '45':
          setDiscount(45);
          break;
        case '78':
          setDiscount(78);
          break;
        case '99':
          setDiscount(99);
          break;
        default:
          setDiscount(0);
      }
    } else {
      setPromoError('The entered promo code doesn’t exist.');
      setDiscount(0);
    }
  };

  // Handle checkout (save the order and empty the cart)
  const handleCheckout = () => {
    const order = {
      items: cart,
      totalAmount: discountedAmount,
      timestamp: new Date().toISOString(), // Store the timestamp of the order
    };

    // Retrieve the existing orders from localStorage or create an empty array if none exists
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Save the new order into the orders array
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Empty the cart after the order is placed
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));

    // Show order confirmation
    setOrderPlaced(true);
    console.log(existingOrders);
  };

  return (
    <Container className="my-5">
      {/* Page Title */}
      <h1 className="text-center mb-4 text-primary font-weight-bold">Your Shopping Cart</h1>

      {/* Empty Cart Message */}
      {cart.length === 0 && !orderPlaced && (
        <Alert variant="info" className="text-center">
          Your cart is empty. Start shopping now!
        </Alert>
      )}

      {/* Order Confirmation */}
      {orderPlaced && (
        <Alert variant="success" className="text-center">
          Your order has been successfully placed!
        </Alert>
      )}

      {/* Cart Items */}
      <Row>
        {cart.length > 0 &&
          cart.map((item) => (
            <Col key={item.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="shadow-lg rounded border-light">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    <div className="d-flex justify-content-between">
                      <span><strong>Price:</strong> ${item.price}</span>
                      <span><strong>Quantity:</strong> {item.quantity}</span>
                    </div>
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" onClick={() => updateQuantity(item.id, 1)} className="w-25">
                      +
                    </Button>
                    <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, -1)} className="w-25">
                      -
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleRemoveItem(item)} className="w-25">
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Promo Code Section */}
      {cart.length > 0 && (
        <div className="mb-4">
          <h4>Have a Promo Code?</h4>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="mr-2"
            />
            <Button variant="primary" onClick={handlePromoCode}>
              Apply Code
            </Button>
          </Form>
          {/* Show error message if promo code is invalid */}
          {promoError && <Alert variant="danger" className="mt-2">{promoError}</Alert>}
        </div>
      )}

      {/* Total Amount and Checkout */}
      {cart.length > 0 && (
        <div className="text-right mb-4">
          <h3>
            <span className="text-muted" style={{ textDecoration: discount > 0 ? 'line-through' : null, marginRight: '10px' }}>
              ${totalAmount.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-success">
                ${discountedAmount.toFixed(2)}
              </span>
            )}
          </h3>
          {discount > 0 && <p className="text-danger">Discount Applied: ${discount}</p>}
          <Button variant="success" className="mt-3 w-100" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      )}

      {/* Modal for item removal confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove the item <strong>{itemToRemove?.title}</strong> from your cart?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Yes, Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartPage;
