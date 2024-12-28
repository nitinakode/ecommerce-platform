import axios from 'axios';

// Use fake API or local mock data
export const fetchProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
