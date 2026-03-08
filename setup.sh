#!/bin/bash

echo "🚀 TPConnect Quick Start Script"
echo "================================"
echo ""

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Please install PostgreSQL first."
    exit 1
fi

# Create database
echo "📦 Creating database..."
createdb tpconnect 2>/dev/null || echo "Database already exists"

# Backend setup
echo ""
echo "🔧 Setting up Backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
echo "Installing Python dependencies..."
pip install -q -r requirements.txt

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "✅ Backend setup complete!"
echo ""
echo "To start backend server:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  uvicorn main:app --reload"
echo ""

# Frontend setup
cd ../frontend
echo "🎨 Setting up Frontend..."

if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install
fi

if [ ! -f ".env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
fi

echo "✅ Frontend setup complete!"
echo ""
echo "To start frontend server:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "================================"
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Start backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "2. Start frontend: cd frontend && npm run dev"
echo "3. Visit http://localhost:3000"
echo ""
