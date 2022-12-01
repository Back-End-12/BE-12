const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    full_name: {
        type: String,
        required: [true, 'Please enter an full name']
    },

   username: {
    type: String,
    required: [true, 'Please enter an name'],
    unique: true
   },

   email: {
       type: String,
       trim: true,
       required : [true, 'Please add a E-mail'],
       unique: true,
       match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid E-mail'
       ]

   },

   password: {
      type: String,
        required: [true, 'Please enter an password'],
        minLength: [6, 'Minimum password length is 6 character']
   },

   role: {
       type: String,
       default: "user"
   },



}, {timestamps: true});



// encrypting password before saving
userSchema.pre('save', async function(next){

   if(!this.isModified('password')){
       next()
   }
   this.password = await bcrypt.hash(this.password, 10);
});



// verify password
userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password);
}

// get the token
userSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}


module.exports = mongoose.model("User", userSchema);
