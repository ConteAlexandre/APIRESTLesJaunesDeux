const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const {descriptionValidate, titleValidate} = require('../Validator/RubricValidator');


rubricSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "Le titre est obligé n'oubliez pas"],
        validate: titleValidate
    },
    description: {
        type: String,
        required: [ true, "Mettez une description ça fait toujorus plaisir"],
        validate: descriptionValidate
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    },
    is_enabled: {
        type: Boolean,
        default: true
    },
    admin: [{ type: ObjectId, ref: 'Admin', required: true}]
});

module.exports = mongoose.model("Rubric", rubricSchema);