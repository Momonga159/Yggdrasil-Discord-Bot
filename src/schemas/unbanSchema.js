const { Schema, model } = require('mongoose');

let unbanSchema = new Schema({
    Guild: String,
    Category: String,
});

module.exports = model('unbanSchema159', unbanSchema);