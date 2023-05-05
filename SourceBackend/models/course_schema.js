const { Schema, model } = require('mongoose');

const courseSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'name field is required'],
        },
        location: {
            type: String,
            required: [true, 'location field is required'],
        },
        description: {
            type: String
        },
        rating: {
            type: Number
        },
        holes: {
            type: Number
        },
        scorecard: {
            type: [Object]
        },
        reviews: {
            type: [String]
        },
        image_path: {
            type: [String]
        },
        website: {
            type: String
        },
        latlong: {
            type: [Number]
        }
    },
    { timestamps: true }
);

module.exports = model('Course', courseSchema);