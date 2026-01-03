const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST API - Create new contact
router.post('/contacts', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      phone,
      message: message || ''
    });
    
    await contact.save();
    res.status(201).json({ 
      success: true, 
      message: 'Contact added successfully', 
      contact 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// GET API - Fetch all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      contacts 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// DELETE API - Delete contact (Bonus)
router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;