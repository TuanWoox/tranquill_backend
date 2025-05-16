# 🏡 Tranquill Retreat Backend

A backend server for the Tranquill Retreat mobile application, a cabin booking and management system.

## 🛠️ Technology Stack

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
</p>

## ✨ Features

- 🔐 User authentication and authorization
- 🏠 Cabin management (create, retrieve, update, delete)
- 📅 Booking system with date availability checking
- ⚙️ System settings management
- 👤 User profile management
- 📷 Image upload for cabins

## 🧩 Design Patterns

### 🔄 Singleton Pattern

- Used in database connection management to ensure a single connection instance.
- Implemented in DAO (Data Access Object) classes to maintain single instances.

### 🧬 Prototype Pattern

- Used for creating new objects based on templates for Users, Cabins, and Bookings.
- Allows efficient object creation with default values that can be customized.

### 💼 DAO (Data Access Object) Pattern

- Separates database operations from business logic.
- Provides a clean interface for data manipulation.

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd tranquill_backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Start the server:
   ```bash
   node main.js
   ```

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tranquill_retreat
JWT_SECRET=your_jwt_secret_key
```

## 🔌 API Endpoints

### 🔐 Authentication

- `POST /auth/signUp` - Register a new user
- `POST /auth/logIn` - Login a user
- `GET /auth/validateJWT` - Validate JWT token

### 👤 User Management

- `GET /user/getInformation` - Get user information
- `PUT /user/updateProfile` - Update user profile

### 🏠 Cabin Management

- `GET /cabin/getAllCabins` - Get all cabins
- `DELETE /cabin/deleteCabin` - Delete a cabin
- `POST /cabin/createCabin` - Create a new cabin
- `POST /cabin/duplicateCabin` - Duplicate a cabin

### 📅 Booking Management

- `GET /booking/getAllBookings` - Get all bookings for a user
- `POST /booking/deleteBooking` - Delete a booking
- `POST /booking/getOneBooking` - Get a specific booking
- `POST /booking/updateBooking` - Update a booking
- `GET /booking/getBookedDates/:cabinId` - Get booked dates for a cabin
- `POST /booking/createBooking` - Create a new booking

### ⚙️ Settings Management

- `GET /setting/getSetting` - Get application settings
- `POST /setting/updateSetting` - Update application settings (admin only)

## 🌱 Database Seeding

The project includes scripts for seeding initial data:

- `seedSetting.js` - Seeds default application settings
- `bookingSeed.js` - Seeds sample booking data for testing

Run the seed scripts with:

```bash
node seedSetting.js
node bookingSeed.js
```
