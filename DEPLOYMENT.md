# TPConnect - Production Deployment Guide

## Pre-Deployment Checklist

### Security
- [ ] Change SECRET_KEY to a strong random value
- [ ] Use production database credentials
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set secure cookie flags
- [ ] Enable rate limiting
- [ ] Add input sanitization
- [ ] Set up firewall rules

### Environment Variables
- [ ] Update DATABASE_URL with production database
- [ ] Set strong SECRET_KEY (use: `openssl rand -hex 32`)
- [ ] Configure NEXT_PUBLIC_API_URL with production API URL
- [ ] Set NODE_ENV=production
- [ ] Configure email service credentials (if added)

### Code Review
- [ ] Remove console.log statements
- [ ] Remove debug code
- [ ] Update CORS origins to production domain
- [ ] Verify error messages don't expose sensitive info
- [ ] Check all API endpoints are protected

## Deployment Options

### Option 1: Docker Deployment (Recommended)

#### 1. Update docker-compose.yml for production
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: tpconnect
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/tpconnect
      SECRET_KEY: ${SECRET_KEY}
    depends_on:
      - postgres
    restart: always

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: ${API_URL}
    depends_on:
      - backend
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: always

volumes:
  postgres_data:
```

#### 2. Create .env file for production
```bash
DB_USER=tpconnect_user
DB_PASSWORD=your_secure_password_here
SECRET_KEY=your_secret_key_from_openssl_rand_hex_32
API_URL=https://api.yourdomain.com
```

#### 3. Deploy
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: AWS Deployment

#### Architecture
- **Frontend**: AWS Amplify or S3 + CloudFront
- **Backend**: AWS ECS or EC2
- **Database**: AWS RDS (PostgreSQL)
- **Load Balancer**: AWS ALB
- **SSL**: AWS Certificate Manager

#### Steps

1. **Setup RDS PostgreSQL**
   ```bash
   # Create RDS instance
   # Note the endpoint URL
   # Update security groups
   ```

2. **Deploy Backend to ECS**
   ```bash
   # Build and push Docker image to ECR
   docker build -t tpconnect-backend ./backend
   docker tag tpconnect-backend:latest <ECR_URL>
   docker push <ECR_URL>
   
   # Create ECS task definition
   # Create ECS service
   # Configure ALB
   ```

3. **Deploy Frontend to Amplify**
   ```bash
   # Connect GitHub repository
   # Configure build settings
   # Set environment variables
   # Deploy
   ```

### Option 3: Heroku Deployment

#### Backend (Heroku)

1. **Create Heroku app**
   ```bash
   heroku create tpconnect-api
   ```

2. **Add PostgreSQL addon**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

3. **Set environment variables**
   ```bash
   heroku config:set SECRET_KEY=$(openssl rand -hex 32)
   ```

4. **Create Procfile**
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

#### Frontend (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard**
   ```
   NEXT_PUBLIC_API_URL=https://tpconnect-api.herokuapp.com
   ```

### Option 4: VPS Deployment (DigitalOcean, Linode, etc.)

#### 1. Setup Server
```bash
# SSH into server
ssh root@your_server_ip

# Update system
apt update && apt upgrade -y

# Install dependencies
apt install -y python3-pip python3-venv nodejs npm postgresql nginx certbot
```

#### 2. Setup PostgreSQL
```bash
# Create database and user
sudo -u postgres psql
CREATE DATABASE tpconnect;
CREATE USER tpconnect_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tpconnect TO tpconnect_user;
\q
```

#### 3. Deploy Backend
```bash
# Clone repository
git clone <your_repo_url>
cd tpconnect/backend

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://tpconnect_user:your_password@localhost:5432/tpconnect
SECRET_KEY=$(openssl rand -hex 32)
EOF

# Create systemd service
sudo nano /etc/systemd/system/tpconnect-backend.service
```

**Backend Service File:**
```ini
[Unit]
Description=TPConnect Backend
After=network.target

[Service]
User=www-data
WorkingDirectory=/path/to/tpconnect/backend
Environment="PATH=/path/to/tpconnect/backend/venv/bin"
ExecStart=/path/to/tpconnect/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

[Install]
WantedBy=multi-user.target
```

```bash
# Start service
sudo systemctl start tpconnect-backend
sudo systemctl enable tpconnect-backend
```

#### 4. Deploy Frontend
```bash
cd ../frontend
npm install
npm run build

# Create systemd service
sudo nano /etc/systemd/system/tpconnect-frontend.service
```

**Frontend Service File:**
```ini
[Unit]
Description=TPConnect Frontend
After=network.target

[Service]
User=www-data
WorkingDirectory=/path/to/tpconnect/frontend
Environment="PATH=/usr/bin:/usr/local/bin"
Environment="NODE_ENV=production"
ExecStart=/usr/bin/npm start

[Install]
WantedBy=multi-user.target
```

```bash
# Start service
sudo systemctl start tpconnect-frontend
sudo systemctl enable tpconnect-frontend
```

#### 5. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/tpconnect
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/tpconnect /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. Setup SSL with Let's Encrypt
```bash
sudo certbot --nginx -d yourdomain.com
```

## Post-Deployment

### Monitoring

1. **Setup Logging**
   ```bash
   # Backend logs
   sudo journalctl -u tpconnect-backend -f
   
   # Frontend logs
   sudo journalctl -u tpconnect-frontend -f
   ```

2. **Setup Monitoring Tools**
   - Use Sentry for error tracking
   - Use New Relic or DataDog for performance monitoring
   - Setup uptime monitoring (UptimeRobot, Pingdom)

3. **Database Backups**
   ```bash
   # Create backup script
   #!/bin/bash
   pg_dump tpconnect > /backups/tpconnect_$(date +%Y%m%d).sql
   
   # Add to crontab (daily at 2 AM)
   0 2 * * * /path/to/backup_script.sh
   ```

### Performance Optimization

1. **Enable Gzip Compression** (Nginx)
2. **Setup CDN** (CloudFlare, AWS CloudFront)
3. **Enable Database Connection Pooling**
4. **Add Redis for Caching** (optional)
5. **Optimize Images and Assets**

### Security Hardening

1. **Setup Firewall**
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

2. **Disable Root Login**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   sudo systemctl restart sshd
   ```

3. **Setup Fail2Ban**
   ```bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   ```

4. **Regular Updates**
   ```bash
   # Setup automatic security updates
   sudo apt install unattended-upgrades
   ```

## Rollback Plan

1. **Keep Previous Version**
   ```bash
   # Tag releases
   git tag -a v1.0.0 -m "Release 1.0.0"
   git push origin v1.0.0
   ```

2. **Database Migrations**
   ```bash
   # Always backup before migration
   pg_dump tpconnect > backup_before_migration.sql
   
   # Rollback if needed
   psql tpconnect < backup_before_migration.sql
   ```

3. **Docker Rollback**
   ```bash
   # Use specific image tags
   docker-compose down
   docker-compose up -d --build <previous_version>
   ```

## Maintenance

### Regular Tasks
- [ ] Monitor server resources (CPU, RAM, Disk)
- [ ] Check application logs for errors
- [ ] Review database performance
- [ ] Update dependencies (security patches)
- [ ] Test backup restoration
- [ ] Review user feedback
- [ ] Monitor API response times

### Monthly Tasks
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Database cleanup (old data)
- [ ] SSL certificate renewal check
- [ ] Dependency updates

## Support & Troubleshooting

### Common Production Issues

1. **High CPU Usage**
   - Check for slow database queries
   - Review API endpoint performance
   - Consider scaling horizontally

2. **Memory Leaks**
   - Monitor application memory usage
   - Restart services if needed
   - Review code for memory leaks

3. **Database Connection Issues**
   - Check connection pool settings
   - Verify database server status
   - Review connection limits

4. **Slow Response Times**
   - Enable caching
   - Optimize database queries
   - Use CDN for static assets
   - Consider load balancing

## Scaling Strategy

### Horizontal Scaling
- Use load balancer (Nginx, AWS ALB)
- Deploy multiple backend instances
- Use managed database (AWS RDS, DigitalOcean Managed DB)
- Implement session management (Redis)

### Vertical Scaling
- Upgrade server resources
- Optimize database configuration
- Increase connection pool size

## Cost Estimation

### Small Scale (< 1000 users)
- VPS: $10-20/month
- Database: Included or $10/month
- Domain: $10-15/year
- SSL: Free (Let's Encrypt)
- **Total: ~$25-35/month**

### Medium Scale (1000-10000 users)
- AWS/DigitalOcean: $50-100/month
- Managed Database: $25-50/month
- CDN: $10-20/month
- Monitoring: $20/month
- **Total: ~$105-190/month**

### Large Scale (10000+ users)
- Cloud Infrastructure: $200-500/month
- Database: $100-200/month
- CDN: $50-100/month
- Monitoring & Tools: $50-100/month
- **Total: ~$400-900/month**
