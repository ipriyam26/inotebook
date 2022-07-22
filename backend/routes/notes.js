const express = require("express");
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');
const User = require("../models/users");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/notes");
const JWT_SECRET = "random778array0394"

// route for getting all notes by a user
router.get("/getall", fetchuser, async (req, res) => {
   try{
const notes = await Notes.find({userId:req.user.id});
res.status(200).json(notes);
   }
   catch(err){
       console.log(err.message);
       res.status(500).json("Internal Server Error");
   }

})

// route for creating a new note, make sure user can create notes only if they are logged in
router.post("/create", fetchuser,
[
    body('title', 'Title is required').isLength({ min: 5 }).not().isEmpty(),
    body('description', 'Description is required').isLength({ min: 5 }).not().isEmpty(),
    body('tags', 'Tags is required').isArray().not().isEmpty(),
],
async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const note = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            userId: req.user.id,
        })
        res.status(200).json(note);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json("Internal Server Error");
    }
})

//route for updating notes, make sure user can update notes only if they are logged in and they are the owner of the note
router.put("/update/:id", fetchuser, async (req, res) => {
    try{
        const { title, description, tag } = req.body;
        let newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if(note.userId != req.user.id){
            return res.status(401).json("Unauthorized");
        }
        if(!note){
            return res.status(404).json("Note not found");
        }
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {
            $set: newNote
        }, {new: true});
        res.status(200).json(updatedNote);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json("Internal Server Error");
    }
})

//route to delete a note, make sure user can delete notes only if they are logged in and they are the owner of the note
router.delete("/delete/:id", fetchuser, async (req, res) => {
    try{
        let note = await Notes.findById(req.params.id);
        if(note.userId != req.user.id){
            return res.status(401).json("Unauthorized");
        }
        if(!note){
            return res.status(404).json("Note not found");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({"Success": "Note deleted","note":note});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json("Internal Server Error");
    }
})

module.exports = router;