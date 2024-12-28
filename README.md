Here is the **README.md** file written in Markdown:

```markdown
# E-Commerce Web Application

A simple and responsive e-commerce web application built using React and React-Bootstrap. This application allows users to browse products, add them to their cart, apply promo codes, and place orders. The data is fetched from a fake API, and the app uses `localStorage` for storing the cart and order history.

## Features

- **Product Listings:** Browse products by category and search for items by name.
- **Product Details:** View detailed information about each product.
- **Cart Functionality:** Add products to the cart, update quantities, and remove items.
- **Promo Code:** Apply promo codes to get discounts on the total order.
- **Order History:** View a history of orders placed with timestamps and total amounts.
- **Responsive Design:** Fully responsive layout for desktop and mobile views.

## Project Structure

The project is structured as follows:

```
├── component/
│   ├── Navbar.js           # Navigation bar component
│   ├── ProductCard.js      # Product card component
│   
├── pages/
│   ├── CartPage.js         # Shopping cart page
│   ├── HomePage.js         # Home page with product listings
│   ├── OrderHistoryPage.js # User's order history page
│   ├── ProductDetailPage.js # Detailed view of a product
│   
├── services/
│   └── api.js             # API calls (fetching products)
│
├── App.js                  # Main entry point of the application (Router setup)
├── index.js                # Renders the React app
└── package.json             # Project dependencies and scripts
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/e-commerce-web-app.git
```

### 2. Install dependencies

Navigate to the project directory and install dependencies using npm or yarn.

```bash
cd e-commerce-web-app
npm install
```

or

```bash
yarn install
```

### 3. Run the app

Once the dependencies are installed, start the development server:

```bash
npm start
```

or

```bash
yarn start
```

The app will run on `http://localhost:3000` by default.

## Application Details

### Components

- **NavBar:** A responsive navigation bar that links to the Home, Cart, and Order History pages.
- **ProductCard:** A reusable card component that displays product details like title, image, and price. It also allows adding products to the cart.
- **CartPage:** Displays the items in the cart, allows updating quantities, and applying promo codes for discounts.
- **OrderHistoryPage:** Displays a history of placed orders with item details and the total amount.
- **ProductDetailPage:** Displays detailed information about a selected product, including its description, price, and rating.

### Services

- **api.js:** Handles fetching products from a mock API (`fakestoreapi.com`).

### Pages

- **HomePage:** Displays product listings, categorized and sorted. Users can search for products.
- **CartPage:** A page where users can view their selected items, apply promo codes, and proceed to checkout.
- **OrderHistoryPage:** A page that shows the history of placed orders, including the items and total amount.
- **ProductDetailPage:** Displays detailed information about a selected product when clicked.

## Features in Detail

### Product Listings

On the homepage, users can view products, search by product title, and sort products by price or popularity. Each product is displayed in a card with the option to add it to the cart.

### Cart Functionality

The cart allows users to:
- View items added to the cart.
- Update quantities of items.
- Remove items from the cart.
- View the total cost and apply promo codes for discounts.

### Promo Code

Users can enter a promo code on the Cart page to get a discount on their order. Valid promo codes are `23`, `45`, `78`, and `99`. Each code corresponds to a fixed discount value.

### Order History

Once an order is placed, it is stored in the browser’s `localStorage`. Users can view their order history, including item details and total amounts.

## Technologies Used

- **React:** The main library for building the user interface.
- **React-Router-DOM:** For client-side routing.
- **React-Bootstrap:** A popular library for responsive and customizable UI components.
- **Axios:** For making HTTP requests to fetch product data.
- **localStorage:** For storing the cart and order history in the browser.

## Future Improvements

- **User Authentication:** Add user login and registration to personalize the experience.
- **Backend Integration:** Integrate with a real backend for user management, products, and orders.
- **Payment Integration:** Implement a payment gateway like Stripe or PayPal for order checkout.
- **Enhanced Error Handling:** Improve error handling and loading states across the app.

## Contributing

Feel free to fork this project and submit pull requests. Any feedback or improvements are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy shopping! 😊
```

This **README.md** file is structured in markdown format with clear sections that explain the features, installation, and structure of the project. You can copy and paste this into your project directory as the `README.md` file.
