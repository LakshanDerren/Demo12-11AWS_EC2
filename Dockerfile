# ==========================================
# STAGE 1: The "Builder" (Construction Site)
# ==========================================
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker caching
# This makes re-builds super fast if you didn't change dependencies
COPY package*.json ./

# Install ALL dependencies (including devDependencies like nodemon, etc.)
RUN npm install

# Copy the rest of your source code
COPY . .

# (Optional) If you use TypeScript, you would run 'npm run build' here
# RUN npm run build

# ==========================================
# STAGE 2: The "Production" (Showroom)
# ==========================================
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json again
COPY package*.json ./

# Install ONLY production dependencies (skips dev tools to save space)
RUN npm install --only=production

# Copy the source code from the 'builder' stage
# We only take what we need.
COPY --from=builder /app/src ./src

# Expose the port your app runs on
EXPOSE 3000

# Start the application
# Adjust this path if your main file is named differently
CMD ["node", "src/index.js"]