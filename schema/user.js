const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { Schema, model } = mongoose;


const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true,
        unique:true 
    },
    password: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String,
        required: true 
    },
},
    { collection: 'user-data' }
);

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

const UserModel = model('User', UserSchema);

module.exports = UserModel;