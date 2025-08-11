const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum : ['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type : Number,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique:true
    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true
    },
    username : {
        type : String,
        required:true
    },
    password : {
        type : String,
        required:true
    }

})

//create person model

personSchema.pre('save',async function (next){
    const person = this;

    //hash the password only if it has benn modified or its new]
    if(!person.isModified('password')) return next();
    try {
        // hash password generater
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedpassword = await bcrypt.hash(person.password,salt)

        // it replace password with hashed password
        person.password = hashedpassword
        next();
    } catch (error) {
        return next(err)
    }
})

personSchema.methods.comparepassword=async function (candidatePassword){
    try {
        //this will compare provided passpord with hashed password
        const ismatch = await bcrypt.compare(candidatePassword,this.password)
        return ismatch;
    } catch (error) {
        throw err;
    }
}

const Person = mongoose.model('Person',personSchema);
module.exports = Person