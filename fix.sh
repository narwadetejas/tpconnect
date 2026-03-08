#!/bin/bash

echo "🔧 Fixing TPConnect Setup Issues..."
echo ""

# Go to backend
cd /home/t9ja5/projects/tpconnect/backend

# Activate venv
source venv/bin/activate

# Install missing package
echo "📦 Installing email-validator..."
pip install email-validator

# Update .env to use SQLite
echo ""
echo "📝 Updating .env file to use SQLite..."
cat > .env << 'EOF'
DATABASE_URL=sqlite:///./tpconnect.db
SECRET_KEY=your-secret-key-change-in-production-use-openssl-rand-hex-32
EOF

echo ""
echo "✅ Fixes applied!"
echo ""
echo "Now run:"
echo "  uvicorn main:app --reload --host 0.0.0.0 --port 8000"
