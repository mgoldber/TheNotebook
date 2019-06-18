'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: String,
    description: String,
    author: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Note', noteSchema);