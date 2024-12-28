import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart, cart }) => {
  // Check if the product is already in the cart
  const isProductInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity: 1, // Set initial quantity to 1
    };
    addToCart(productToAdd);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
        </Link>
        <Button
          variant={isProductInCart ? 'success' : 'primary'}
          onClick={isProductInCart ? null : handleAddToCart} // Disable button if item is already in cart
          disabled={isProductInCart} // Disable the button if the item is in the cart
        >
          {isProductInCart ? 'Added' : 'Add to Cart'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
