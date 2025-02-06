# AgriLink

AgriLink is a web application designed to connect farmers directly with buyers, providing a seamless platform for purchasing fresh, local produce. The application offers features for both farmers and buyers, including account management, product listings, order tracking, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### For Buyers

- **Marketplace**: Browse and purchase fresh produce directly from farmers.
- **Order Management**: Track and manage your orders.
- **User Profile**: Manage your personal information and view order history.
- **Cart**: Add products to your cart and proceed to checkout.

### For Farmers

- **Dashboard**: View statistics on products sold, current month value, pending orders, and active listings.
- **Product Management**: Add, edit, and manage your product listings.
- **Order Management**: View and manage orders placed by buyers.
- **Payments**: Track your earnings and view recent payments.
- **Analytics**: Gain insights into revenue trends, product sales distribution, and customer growth.

## Installation

To get started with AgriLink, follow these steps:

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/agrilink.git
    cd agrilink
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the necessary environment variables. Example:

    ```env
    REACT_APP_API_BASE_URL=https://agrilink-1-870p.onrender.com
    ```

4. **Start the development server**:

    ```sh
    npm start
    ```

## Usage

### Running the Application

To run the application locally, use the following command:

```sh
npm start
```

This will start the development server and open the application in your default web browser.

### Building for Production

To create a production build of the application, use the following command:

```sh
npm run build
```

This will generate optimized static files in the `build` directory.

## Project Structure

The project structure is organized as follows:

```markdown
.
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── authentication/
│   │   │   ├── BuyerSignup.jsx
│   │   │   ├── FarmerSignup.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── LoginBuyer.jsx
│   │   │   ├── LoginFarmer.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── BuyerUI/
│   │   │   ├── BottomNavigation.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── SuccessPage.jsx
│   │   │   └── UserOrders.jsx
│   │   ├── FarmerUI/
│   │   │   ├── AddProduct.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Payments.jsx
│   │   │   └── Products.jsx
│   │   ├── context/
│   │   │   ├── Cart.jsx
│   │   │   └── ComingSoon.jsx
│   │   ├── Hero.jsx
│   │   ├── Spinner.jsx
│   ├── utils/
│   │   └── Axios.jsx
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── output.css
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── tailwind.config.js
```

## Contributing

We welcome contributions to AgriLink! To contribute, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

    ```sh
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes**.
4. **Commit your changes**:

    ```sh
    git commit -m 'Add some feature'
    ```

5. **Push to the branch**:

    ```sh
    git push origin feature/your-feature-name
    ```

6. **Open a pull request**.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
