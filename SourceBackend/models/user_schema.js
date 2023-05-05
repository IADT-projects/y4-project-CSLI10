const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email field is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password field is required'],
        },
        favourite_courses: {
            type: [String]
        },
        played_courses: {
            type: [Object]
        },
        stats: {
            type: Object
        }

    },
    { timestamps: true }
);

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password, function(result){
        return result;
    })
}

module.exports = model('User', userSchema);