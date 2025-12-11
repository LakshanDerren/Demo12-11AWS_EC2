import { Router } from 'express';
const router = Router();
import { createItem, getItems, updateItem, deleteItem } from './controller';

// Route Definitions
router.post('/items', createItem);       // Create
router.get('/items', getItems);          // Read All
router.put('/items/:id', updateItem);    // Update
router.delete('/items/:id', deleteItem); // Delete

// A simple health check route to test if server is up
router.get('/', (req, res) => {
  res.send('API is running! Connect to /items to see data.');
});

export default router;