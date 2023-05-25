const mongoose = require ('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence'){mongoose};
const bcrypt = require ("bcrypt");

let userSchema = Schema({

    full_name: {
        type: String,
        required: [true, 'Nama harus diisi'],
        maxlength: [255, ' Panjang harus antara 3 - 255 karakter'],
        minlength: [3,'Panjang harus antara 3 - 255 karakter']
    },
    eamil: {
        type: String,
        required: [true, 'email harus diisi'],
        maxlength: [255, 'Panjang email maksimal 255 karakter']
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        maxlength: [255, 'Panjang Password maksimal 255 karakter']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: [String]
}, {timestamp: true});

userSchema.path('email').validate(function(value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email yang valid`);

userSchema.path('email').validate(async function(value){

    try{
        const count = await this.model('User').count({eamil: value});
        return !count;
    }catch(err){
        throw err
    }
}, atr => `${attr.value} sudah terdaftar`);

const HASH_ROUND = 10;
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next()
});

userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});

module.exports = model('User', userSchema);