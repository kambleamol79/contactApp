const express = require("express");
const router = express.Router();
require('dotenv').config();
var contact = require("../models/contact.model");

router.get("/", (req, res, next) => {
    contact.find()
        .then(contacts => {
            res.status(200).json({ message: "contact fetched successfully", contacts: contacts })
        })
        .catch(err => {
            res.status(500).json({ message: "Can not fetch contact" })
        })
})

router.post("/add", (req, res, next) => {
    var contactData = new contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        jobtitle: req.body.jobtitle,
        company: req.body.company
    });
    console.log(req.body)
    contactData.save()
        .then(contactDetails => {
            res.status(201).json({ message: "Contact Added", contactDetails: contactDetails })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", err: err })
        })
})

router.get("/:id", (req, res, next) => {
    contact.findById({ _id: req.params.id })
        .then(contact => {
            if (contact) {
                res.status(200).json({ message: "contact fetched successfully", contacts: contact })
            } else {
                res.status(401).json({ message: "contact not found!", contacts: contact })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Can not fetch contact" })
        })
})

router.put("/:id", (req, res, next) => {
    contact.updateOne({ _id: req.params.id}, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        jobtitle: req.body.jobtitle,
        company: req.body.company
    }).exec()
        .then(contact => {
            if (contact.nModified > 0) {
                res.status(200).json({ message: "contact updated successfully", contact: contact })
            } else {
                res.status(401).json({ message: "Something went wrong", contact: contact })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Can not update contact", err: err })
        })
})

router.delete("/:id", (req, res, next) => {
    contact.deleteOne({ _id: req.params.id }).exec()
        .then(contact => {
            console.log(contact)
            if (contact.n > 0) {
                res.status(200).json({ message: "contact deleted successfully" })
            } else {
                res.status(401).json({ message: "Unauthorized!" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Can not delete contact", err: err })
        })
})

module.exports = router;