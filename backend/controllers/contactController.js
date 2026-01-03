const Contact = require('../models/contactModel');

// @desc    Get all contacts
// @route   GET /api/contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new contact
// @route   POST /api/contacts
const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if(!contact) return res.status(404).json({ message: "Contact not found" });
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getContacts, createContact, deleteContact };