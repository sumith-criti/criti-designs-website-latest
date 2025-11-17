# Setup script for local development
Write-Host "Setting up Invoice Management System..." -ForegroundColor Green

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    
    $envContent = @"
# Database
# For PostgreSQL (default):
DATABASE_URL="postgresql://postgres:password@localhost:5432/criti_designs?schema=public"
# For SQLite (uncomment to use instead):
# DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-key-change-in-production-min-32-characters-long"

# Email (optional)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM=""
"@
    
    $envContent | Out-File -FilePath .env -Encoding utf8
    Write-Host ".env file created!" -ForegroundColor Green
    Write-Host "Please edit .env file and update DATABASE_URL with your PostgreSQL credentials" -ForegroundColor Yellow
} else {
    Write-Host ".env file already exists" -ForegroundColor Green
}

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file and set your DATABASE_URL" -ForegroundColor White
Write-Host "2. Run: npm run db:push" -ForegroundColor White
Write-Host "3. Run: npm run db:seed" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White

