# E-commerce Application

A full-stack e-commerce application built with React and Node.js.

## Features

- User Authentication (Login/Register)
- Product Management
- Shopping Cart
- Order Management
- Responsive Design

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```bash
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_here_please_change_this_in_production
   PORT=8000
   ```

4. Start MongoDB (if running locally):
   - Windows: Start MongoDB service or run `mongod`
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the root directory:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (.env in backend directory)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 8000)

### Frontend (.env in root directory)
- `VITE_API_BASE_URL`: Backend API URL

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the MONGO_URI in your .env file
- Verify MongoDB is accessible on the specified port

### Authentication Issues
- Check if JWT_SECRET is set in backend .env
- Verify CORS settings in server.js
- Ensure frontend and backend are running on correct ports

### CORS Issues
- Make sure the frontend URL is included in the CORS origin array
- Check that credentials are properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
