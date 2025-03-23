# 🛒 Stationery Shop Backend

Welcome to the backend of the **Stationery Shop Application**! 🖊️📚 This project powers a seamless e-commerce experience for users, featuring secure authentication, efficient product management, and a responsive design.

**Live Demo**: [Stationery Shop](https://stationery-shop-server-jade.vercel.app)

# 🎯 Project Overview & Objective

The goal of this project is to develop a user-friendly stationery shop with:

- **Secure Authentication** 🔐 (JWT-based authentication & role-based access)
- **Efficient Product Management** 🛍️ (CRUD operations for products & orders)
- **Seamless Order Processing** 📦 (Order tracking & management)
- **Smooth User Experience** 💡 (Error handling & optimized API performance)

# 🚀 Tech Stack

This backend is built using:

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for handling API requests
- **MongoDB** - NoSQL database for storing products, users, and orders
- **Mongoose** - ODM for MongoDB interactions
- **JWT Authentication** - Secure authentication system
- **Bcrypt** - Password hashing for security
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management
- **Zod**: Schema-based data validation.

# 🛠️ Installation and Setup

To get started with the project locally, follow these steps:

## 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Ishtiak007/Stationery-Shop-Server.git
```

## 2. Navigate to the Project Folder

Go to the project directory:

```bash
cd Stationery-Shop-Server
```

## 3. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
```

## 4. Setup Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=
BCRYPT_SALT=12
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=10d
JWT_REFRESH_EXPIRES_IN=365d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_EMAIL=
APP_PASS=
SP_ENDPOINT=
SP_USERNAME=
SP_PASSWORD=
SP_PREFIX=
SP_RETURN_URL=
```

## 5. Run the Application

Start the development server:

```bash
npm run start:dev
```

Your application should now be running at `http://localhost:3000`.

# Testing & Development Tools

- **Postman**: API testing and debugging.
- **Nodemon**: Auto-restarting for development.
- **ESLint**: Code linting to enforce consistent coding standards.
- **Prettier**: Code formatter to maintain clean and readable code.

# Deployment

- **Vercel**: For seamless deployment and hosting.
- **dotenv**: Environment variable management.

# 📩 Get in Touch

For any questions, feedback, or collaboration opportunities, feel free to connect:

- 📧 **Email**: [ishtiakahmed18899@gmail.com](mailto:ishtiakahmed18899@gmail.com)
- 🖥 **GitHub**: [Ishtiak Ahmed](https://github.com/Ishtiak007)
- 💼 **LinkedIn**: [Ishtiak Ahmed](https://www.linkedin.com/in/ishtiak-ahmed-2846722a5/)
