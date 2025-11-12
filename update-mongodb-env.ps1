# Update .env file with MongoDB connection string
$envContent = @"
# Database
DATABASE_URL="mongodb+srv://ehteshambutt58:4G9PFxLyIR6PqGLn@cluster0.mw68zmh.mongodb.net/number_discussion?retryWrites=true&w=majority"

# JWT Configuration
JWT_SECRET=015047b52f5762247662f70ad1247977978691975e028b8d4b48e12c663aeb07c8bd1c068453c67d7015a8adedb2db7f926d8fd385d104d6cd5db8fb6b737831
ACCESS_TOKEN_SECRET=015047b52f5762247662f70ad1247977978691975e028b8d4b48e12c663aeb07c8bd1c068453c67d7015a8adedb2db7f926d8fd385d104d6cd5db8fb6b737831
REFRESH_TOKEN_SECRET=a1c174688653d454321b141527bb6143fc5520f788610b46174674b7777f4e2fb4a538de3c8d094f263c1798635d64affd016ffb74cee0b3c11e5d0540bc78e9

# Server
PORT=3001
NODE_ENV=development
"@

$envPath = Join-Path $PSScriptRoot "server\.env"
Set-Content -Path $envPath -Value $envContent -Encoding UTF8
Write-Host "✅ Updated server\.env with MongoDB connection string"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Stop the server if it's running (Ctrl+C)"
Write-Host "2. Run: cd server"
Write-Host "3. Run: npm run prisma:generate"
Write-Host "4. Start the server: npm run dev"

