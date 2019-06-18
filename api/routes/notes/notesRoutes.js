const express = require('express');
const router = express.Router();

const Note = require('./notesModel'); 
const noteService = require('./notesService');

// GET /words/
router.route('/notes')
    .get(async (req, res, next) => {
        try {
            Note.find(req.body).then(docs => {
                res.status(200).send(docs);
            });
        } catch (e) {
            next(e);
        }
    });

router.route('/notes')
    .post(async (req, res, next) => {
        try {
            const note = new Note(req.body);
            note.save().then((doc) => {
                res.status(200).send(doc)
            }).catch((err) => {
                console.log(err);
            });
        } catch (e) {
            next(e);
        }
    });


router.route('/notes/:user_id')
    .post(async (req, res, next) => {
        try {
            Note.find({ author: req.params.user_id })
                .then((doc) => {
                    res.status(200).send(doc);
                })
                .catch((err) => {
                    res.status(400).send(err);
                });
        } catch (e) {
            next(e);
        }
    });


exports.router = router;