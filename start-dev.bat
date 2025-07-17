@echo off
echo 🚀 Starting DocSahayak Development Environment...

REM Check if PostgreSQL is running
echo 📊 Checking PostgreSQL connection...
pg_isready -h localhost -p 5432 >nul 2>&1
if errorlevel 1 (
    echo ❌ PostgreSQL is not running. Please start PostgreSQL first.
    pause
    exit /b 1
)
echo ✅ PostgreSQL is running

REM Check if database exists
echo 🗄️  Checking database...
psql -U postgres -lqt | findstr /C:"DocumentSewa" >nul
if errorlevel 1 (
    echo 📝 Creating database...
    createdb -U postgres DocumentSewa
    echo ✅ Database created
    
    echo 📋 Initializing database schema...
    psql -U postgres -d DocumentSewa -f Backend\init-db.sql
    echo ✅ Database schema initialized
) else (
    echo ✅ Database exists
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd Backend
call npm install
echo ✅ Backend dependencies installed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\Frontend
call npm install
echo ✅ Frontend dependencies installed

REM Start backend server
echo 🔧 Starting backend server...
cd ..\Backend
start "Backend Server" cmd /k "npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server
echo 🎨 Starting frontend server...
cd ..\Frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo 🎉 DocSahayak is starting up!
echo.
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend:  http://localhost:3001
echo 📊 Database: PostgreSQL (DocumentSewa)
echo.
echo Press any key to exit...
pause >nul 