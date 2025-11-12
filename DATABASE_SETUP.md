# Database Setup Guide

The application requires PostgreSQL to be running. You have two options:

## Option 1: Using Docker (Recommended)

1. **Install Docker Desktop** (if not already installed):
   - Download from: https://www.docker.com/products/docker-desktop/
   - Install and start Docker Desktop

2. **Start PostgreSQL container:**
   ```powershell
   docker compose up -d
   ```

3. **Wait a few seconds** for PostgreSQL to initialize, then run migrations:
   ```powershell
   cd server
   npm run prisma:migrate
   ```

## Option 2: Using Local PostgreSQL

1. **Install PostgreSQL** on Windows:
   - Download from: https://www.postgresql.org/download/windows/
   - During installation, remember the password you set for the `postgres` user

2. **Create the database:**
   ```sql
   CREATE DATABASE number_discussion;
   ```

3. **Update `server/.env`** with your PostgreSQL credentials:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/number_discussion?schema=public"
   ```

4. **Run migrations:**
   ```powershell
   cd server
   npm run prisma:migrate
   ```

## Verify Database Connection

After setting up, you can verify the connection by:
1. Starting the server: `cd server && npm run dev`
2. The server should start without database errors
3. You can also use Prisma Studio to view the database:
   ```powershell
   cd server
   npm run prisma:studio
   ```

## Troubleshooting

- **"Authentication failed"**: Check that PostgreSQL is running and credentials in `.env` are correct
- **"Connection refused"**: Make sure PostgreSQL is running (check Docker container or Windows service)
- **"Database does not exist"**: Run the migration command to create tables

