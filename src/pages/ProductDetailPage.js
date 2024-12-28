import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { fetchProducts } from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const products = await fetchProducts();
      const selectedProduct = products.find(product => product.id === parseInt(id)); // Find the product by ID
      setProduct(selectedProduct);
    };

    loadProduct();
  }, [id]); // Fetch product when the product ID changes

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
        </Col>
      </Row>
    </Container>
    
  );
};

export default ProductDetailPage;
