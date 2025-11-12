# Setup Instructions

## Quick Start

1. **Copy environment file:**
   ```bash
   cp server/.env.example server/.env
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. **Start PostgreSQL with Docker:**
   ```bash
   npm run docker:up
   ```

4. **Set up database:**
   ```bash
   cd server
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start development servers:**
   ```bash
   # From root directory
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Troubleshooting

If you encounter database connection issues:
- Make sure Docker is running
- Check that PostgreSQL container is healthy: `docker ps`
- Verify DATABASE_URL in `server/.env` matches Docker Compose settings

