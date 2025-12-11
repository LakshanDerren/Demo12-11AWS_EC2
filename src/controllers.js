import { Schema, model } from 'mongoose';

// --- 1. Define the Database Schema (The Blueprint) ---
const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

// Create the Model
const Item = model('Item', ItemSchema);

// --- 2. Define the CRUD Functions ---

// CREATE (Post)
export async function createItem(req, res) {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// READ ALL (Get)
export async function getItems(req, res) {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// UPDATE (Put)
export async function updateItem(req, res) {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Return the updated object, not the old one
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE (Delete)
export async function deleteItem(req, res) {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}