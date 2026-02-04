

# API Key Management Service

A small backend service for managing API keys per account.  
Built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.

The service allows creating, listing, and revoking API keys, with a focus on clean backend structure, correct database usage, and basic security practices.


# Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose


# Running the project locally

# 1. Start PostgreSQL using Docker

docker compose up -d

# 2. Create a .env file based on .env.example

# 3.Database Initialization
    psql -U postgres -d api_keys_db -f database/init.sql

# 4. Install dependencies 
    npm install

# 5. Start the server
    npm run dev
    The server will start on:http://localhost:3000



# Next steps (what I would add with more time)

# 1. Implement `GET /auth/verify` 

The Goal: I want to allow clients to verify their keys by sending them in the x-api-key header. If the key is valid and hasn't been revoked, the server returns the accountId and keyId. Otherwise, it returns a 401 Unauthorized error.

How I will build it:
Request Handling: I'll grab the key from the x-api-key header. First, I'd check that it’s actually there and follows the prefix.secret format. If it’s messy or missing, I'll reject it immediately with a 401.
Finding the Key: In the service layer, I'll split the key. I'll use the prefix to look up the key in the database. If the prefix doesn't exist or if the revokedAt column isn't empty, the key is invalid.
Security Check: This is the most important part. Since I only store the hash of the secret, I'll use bcrypt.compare() to check if the secret provided by the user matches the secretHash in our DB.
Result: If everything matches, I’ll return the IDs so the system knows exactly which account is making the request.


# 2. Improve documentation 

Add a small Postman collection / HTTP file to make testing easier.
Document the code



# 3. Split files by feature inside each layer (as the project grows)

Right now the project is small, so I kept one file per domain per layer (keys controller/service/repository).
If the project grows, I would split the code by feature to keep files shorter and easier to navigate.

This would keep each file focused on a single feature and reduce merge conflicts when multiple people work on the code.

# 4.example curl commands or an HTTP client file

