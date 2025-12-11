require('dotenv').config(); // Load environment variables locally if needed
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import router from './router';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (Parses JSON data coming in)
app.use(json());
app.use(cors());

// --- Database Connection ---
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
  console.error("❌ ERROR: MONGO_URI is missing yoo! Check your .env file or GitHub Secrets.");
  process.exit(1);
}

connect(dbURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- Routes ---
app.use('/', router);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});