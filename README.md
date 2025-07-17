# DocSahayak - Document Management System

A comprehensive document management system built with React (Frontend) and Node.js/Express (Backend).

## Features

- User authentication and registration
- Document application and tracking
- Profile management
- Responsive design with Tailwind CSS
- JWT-based authentication
- PostgreSQL database integration

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Structure

```
DocSahayak-main/
├── Backend/          # Node.js/Express API
├── Frontend/         # React application
└── README.md
```

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL on your system
2. Create a new database named `DocumentSewa`
3. Update the database credentials in `Backend/config.env` if needed

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The backend server will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will run on `http://localhost:5173`

## Environment Variables

### Backend (.env file in Backend directory)

```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=DocumentSewa
DB_PASSWORD=your_password
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3001

# Environment
NODE_ENV=development
```

### Frontend (.env file in Frontend directory)

```env
VITE_API_URL=http://localhost:3001
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth (placeholder)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Documents
- `GET /api/documents/history` - Get document history
- `GET /api/documents/applied` - Get applied documents

## Technologies Used

### Backend
- Node.js
- Express.js
- PostgreSQL
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (Cross-origin resource sharing)
- dotenv (environment variables)

### Frontend
- React 19
- Vite (build tool)
- Tailwind CSS v4
- Framer Motion (animations)
- React Router DOM (routing)
- React Hook Form (form handling)

## Development

### Running in Development Mode

1. Start the backend server:
   ```bash
   cd Backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd Frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

1. Build the frontend:
   ```bash
   cd Frontend
   npm run build
   ```

2. The built files will be in the `Frontend/dist` directory

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `Backend/config.env`
   - Verify the database `DocumentSewa` exists

2. **Port Already in Use**
   - Change the port in `Backend/config.env` or `Frontend/vite.config.js`
   - Kill processes using the ports: `npx kill-port 3001 5173`

3. **CORS Errors**
   - Ensure the backend is running on the correct port
   - Check CORS configuration in `Backend/server.js`

4. **Tailwind CSS Not Working**
   - Ensure Tailwind CSS v4 is properly configured
   - Check `Frontend/tailwind.config.js` and `Frontend/src/index.css`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 