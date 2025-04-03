This is a simple authentication project using Vite, React, TypeScript, React Hook Form, and Axios. The project includes separate pages for Login and Registration.

Installation and Setup

Backend Setup

Clone the repository:

git clone <your-repo-url>
cd backend

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the backend root directory and add:

JWT_SECRET=yourSecretKey
MONGO_URI=yourMongoDBConnectionString

Start the backend server:

npm start

Frontend Setup

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend server:

npm run dev

Open the application in your browser at:

http://localhost:5173

Project Structure

project-root/
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── db/
│   ├── server.ts
│   ├── .env
│   ├── package.json
│── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json

Features

User registration and login with JWT authentication.

Form validation using react-hook-form.

API calls handled via Axios.

Navigation using react-router-dom.

Usage

Register a new user.

After successful registration, the user is redirected to the login page.

Log in using the registered credentials.

Upon successful login, the user receives a JWT token.

Dependencies

Backend:

Express

Mongoose

bcrypt

jsonwebtoken

dotenv

Frontend:

Vite + React

TypeScript

React Hook Form

Axios

React Router DOM
