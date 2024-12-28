import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import ProductCard from '../component/ProductCard';
import { fetchProducts } from '../services/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('price-asc');
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadProducts();
    // Load the cart from localStorage if exists
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const loadProducts = async () => {
    const allProducts = await fetchProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    
    // Get unique categories from the products
    const uniqueCategories = [
      ...new Set(allProducts.map(product => product.category))
    ];
    setCategories(uniqueCategories);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    filterProducts(event.target.value);
  };

  const filterProducts = (query) => {
    if (query === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    sortProducts(option);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];

    if (option === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === 'popularity-asc') {
      sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (option === 'popularity-desc') {
      sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(sortedProducts);
  };

  // Add to Cart Handler
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Container>
      <h1 className="my-4">Shop Our Products</h1>

      {/* Search Bar */}
      <InputGroup className="mb-4" size="lg">
        <Form.Control
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Sort Dropdown */}
      <DropdownButton
        id="dropdown-sort"
        title={`Sort by: ${sortOption.replace('-', ' ')}`}
        onSelect={handleSortChange}
        className="mb-4"
      >
        <Dropdown.Item eventKey="price-asc">Price: Low to High</Dropdown.Item>
        <Dropdown.Item eventKey="price-desc">Price: High to Low</Dropdown.Item>
        <Dropdown.Item eventKey="popularity-asc">Popularity: Low to High</Dropdown.Item>
        <Dropdown.Item eventKey="popularity-desc">Popularity: High to Low</Dropdown.Item>
      </DropdownButton>

      {/* Display Products by Category */}
      {categories.map(category => {
        const categoryProducts = filteredProducts.filter(product => product.category === category);

        return (
          <div key={category}>
            <h3>{category}</h3>
            <Row>
              {categoryProducts.length > 0 ? (
                categoryProducts.map(product => (
                  <Col key={product.id} xs={12} md={4} lg={3} className="mb-4">
                    <ProductCard
                      product={product}
                      addToCart={addToCart}
                      cart={cart} // Pass the current cart state
                    />
                  </Col>
                ))
              ) : (
                <p>No products found in this category.</p>
              )}
            </Row>
          </div>
        );
      })}
    </Container>
  );
};

export default HomePage;
