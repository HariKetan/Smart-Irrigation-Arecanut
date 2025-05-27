const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Generate a secure random string
const jwtSecret = crypto.randomBytes(32).toString('hex');

// Read existing .env file if it exists
const envPath = path.join(process.cwd(), '.env');
let envContent = '';

try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  // File doesn't exist, that's okay
}

// Update or add JWT_SECRET
if (envContent.includes('JWT_SECRET=')) {
  envContent = envContent.replace(/JWT_SECRET=.*/, `JWT_SECRET="${jwtSecret}"`);
} else {
  envContent += `\nJWT_SECRET="${jwtSecret}"`;
}

// Write back to .env file
fs.writeFileSync(envPath, envContent.trim() + '\n');

console.log('JWT secret has been generated and added to .env file'); 