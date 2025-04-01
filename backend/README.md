Below is a professional and well-structured README file for your backend project. It includes an overview, setup instructions, API endpoints, dependencies, and additional details to make it awesome and user-friendly.

---

# Fullstack Backend API

Welcome to the **Fullstack Backend API**, a robust and secure Node.js-based server built with Express.js, PostgreSQL, and modern authentication mechanisms. This project serves as the backend for a full-stack application, providing user registration and login functionality with JWT-based authentication and password hashing for security.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **User Registration**: Securely register users with hashed passwords using `bcrypt`.
- **User Login**: Authenticate users and issue JSON Web Tokens (JWT) for secure sessions.
- **CORS Support**: Configured to allow requests from a frontend running on `http://localhost:3000`.
- **PostgreSQL Integration**: Persistent data storage with a relational database.
- **Error Handling**: Comprehensive try-catch blocks for robust API responses.
- **Modular Code**: Clean and maintainable codebase for easy scalability.

---

## Technologies
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **PostgreSQL**: Relational database for storing user data.
- **pg (node-postgres)**: PostgreSQL client for Node.js.
- **bcrypt**: Library for hashing passwords securely.
- **jsonwebtoken (JWT)**: Token-based authentication mechanism.
- **CORS**: Middleware for enabling cross-origin requests.

---

## Project Structure
```
fullstack-backend/
├── node_modules/         # Dependencies
├── index.js             # Main server file
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation (this file)
```

---

## Setup Instructions

### Prerequisites
- **Node.js** (v16.x or higher)
- **PostgreSQL** (v13.x or higher)
- A PostgreSQL database named `fullstack`

### Installation
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd fullstack-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up PostgreSQL**
   - Install PostgreSQL and create a database named `fullstack`.
   - Create a `users` table with the following schema:
     ```sql
     CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(255) UNIQUE NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
     );
     ```

4. **Configure Database Connection**
   - Update the `pool` configuration in `index.js` with your PostgreSQL credentials:
     ```javascript
     const pool = new Pool({
         user: "postgres",
         host: "localhost",
         database: "fullstack",
         password: "your_password",
         port: 5432
     });
     ```

5. **Run the Server**
   ```bash
   npm start
   ```
   - The server will start at `http://localhost:8000`.

---

## API Endpoints

### 1. Register a User
- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "username": "johndoe",
      "email": "john@example.com",
      "password": "securepassword123"
  }
  ```
- **Success Response** (200):
  ```json
  {
      "message": "User registered successfully!"
  }
  ```
- **Error Response** (400):
  ```json
  {
      "error": "User already exists"
  }
  ```

### 2. Login a User
- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "email": "john@example.com",
      "password": "securepassword123"
  }
  ```
- **Success Response** (200):
  ```json
  {
      "message": "Login Successful!",
      "jwtToken": "<token>"
  }
  ```
- **Error Response** (400):
  ```json
  {
      "error": "Invalid User. Please register first!"
  }
  ```
  OR
  ```json
  {
      "error": "Invalid Password. Please try again!"
  }
  ```
- **Error Response** (500):
  ```json
  {
      "error": "Internal Server Error. Please try again later!"
  }
  ```

---

## Environment Variables
For enhanced security, consider moving sensitive data (e.g., database credentials, JWT secret) to a `.env` file using the `dotenv` package:
1. Install `dotenv`:
   ```bash
   npm install dotenv
   ```
2. Create a `.env` file:
   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=fullstack
   DB_PASSWORD=your_password
   DB_PORT=5432
   JWT_SECRET=MYTOKEN
   ```
3. Update `index.js` to use `dotenv`:
   ```javascript
   require('dotenv').config();
   const pool = new Pool({
       user: process.env.DB_USER,
       host: process.env.DB_HOST,
       database: process.env.DB_NAME,
       password: process.env.DB_PASSWORD,
       port: process.env.DB_PORT
   });
   ```

---

## Usage
- Pair this backend with a frontend application (e.g., React) running on `http://localhost:3000`.
- Use the `/register` endpoint to create new users and `/login` to authenticate them.
- Store the returned `jwtToken` in the frontend (e.g., localStorage) for authenticated requests.

---

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes (`git commit -m "Add awesome feature"`).
4. Push to the branch (`git push origin feature/awesome-feature`).
5. Open a Pull Request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Happy Coding!**  
Built with ❤️ by SURYA NAGULAPALLI  
For questions, reach out at suryanagulapalli40@gmail.com.
