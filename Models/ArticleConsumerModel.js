const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const {titleValidate} = require('../Validator/ArticleValidator');

articleConsumerSchema = mongoose.Schema({
    title: {
        type: String,
        required: [ true, "Veuillez mettre un titre" ],
        validate: titleValidate
    },
    content: {
        type: String,
        required: [ true, "Le contenu ets obligatoire"]
    },
    status: {
        type: Map,
        of: { type: String },
        default: {"Waiting": "Waiting"},
        required: true
    },
    interested: [{ type: ObjectId }],
    not_interested: [{ type: ObjectId }],
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
    number_view: {
        type: Number,
        required: false,
        default: 0
    },
    consumer: [{ type: ObjectId, ref: "Consumer" }],
    city: [{ type: ObjectId, ref: "City" }],
    rubric: [{ type: ObjectId, ref: "Rubric" }]
});

module.exports = mongoose.model("ArticleConsumer", articleConsumerSchema);