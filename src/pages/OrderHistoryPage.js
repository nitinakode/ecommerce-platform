import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const OrderHistoryPage = () => {
  // Fetch orders from localStorage and parse them, or use an empty array if no orders exist
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);

  // Sort orders by timestamp in descending order (most recent first)
  const sortedOrders = orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <Container className="my-5">
      {/* Page Title */}
      <h1 className="text-center mb-4 text-primary font-weight-bold">Your Order History</h1>

      {/* Check if there are no orders */}
      {orders.length === 0 ? (
        <Alert variant="info" className="text-center">
          You have not placed any orders yet.
        </Alert>
      ) : (
        <Row>
          {sortedOrders.map((order, index) => (
            <Col key={index} xs={12} md={6} lg={4} className="mb-4">
              <Card className="shadow-lg rounded border-light">
                <Card.Body>
                  <Card.Title>Order #{index + 1}</Card.Title>
                  <Card.Text>
                    <p><strong>Order Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
                    <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                    <h5>Items in this order:</h5>
                    <ul>
                      {order.items.map((item, i) => (
                        <li key={i}>{item.title} - {item.quantity} x ${item.price}</li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrderHistoryPage;
