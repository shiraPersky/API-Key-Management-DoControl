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
    The server will start on: The server will start on:http://localhost:3000



# Next steps (what I would add with more time)

# 1. Implement `GET /auth/verify` 

**Goal:** Validate an API key sent in the x-api-key header and return { accountId, keyId } if valid and not revoked. Return 401 otherwise.

Architecture for Verify Key:
Add a new route: GET /auth/verify

In the controller:Read x-api-key header ,Validate it exists and is a string.,Validate format: it must contain a dot (prefix.secret).,If invalid format -> return 401 

In the service: Split the key into prefix and secret,Query DB by prefix to find the key record.If not found -> 401, If revokedAt is not null -> 401, Compare secret with secret_hash using bcrypt.compare ,If compare fails -> 401 If ok -> return { accountId, keyId: id }

In the repository:Add findByPrefix(prefix): SELECT ... FROM api_keys WHERE prefix = $1 LIMIT 1


# 2. Improve documentation 

Add a small Postman collection / HTTP file to make testing easier.
Document the code



# 3. Split files by feature inside each layer (as the project grows)

Right now the project is small, so I kept one file per domain per layer (keys controller/service/repository).
If the project grows, I would split the code by feature to keep files shorter and easier to navigate.

This would keep each file focused on a single feature and reduce merge conflicts when multiple people work on the code.

# 4.example curl commands or an HTTP client file

