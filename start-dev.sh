#!/bin/bash

# DocSahayak Development Startup Script

echo "🚀 Starting DocSahayak Development Environment..."

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL connection..."
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi
echo "✅ PostgreSQL is running"

# Check if database exists
echo "🗄️  Checking database..."
if ! psql -U postgres -lqt | cut -d \| -f 1 | grep -qw DocumentSewa; then
    echo "📝 Creating database..."
    createdb -U postgres DocumentSewa
    echo "✅ Database created"
    
    echo "📋 Initializing database schema..."
    psql -U postgres -d DocumentSewa -f Backend/init-db.sql
    echo "✅ Database schema initialized"
else
    echo "✅ Database exists"
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd Backend
npm install
echo "✅ Backend dependencies installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../Frontend
npm install
echo "✅ Frontend dependencies installed"

# Start backend server
echo "🔧 Starting backend server..."
cd ../Backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server..."
cd ../Frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 DocSahayak is starting up!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:3001"
echo "📊 Database: PostgreSQL (DocumentSewa)"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait $BACKEND_PID $FRONTEND_PID 