const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    balance:Number,
    expense:Number,
    income:Number,
    transaction:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'transaction'
        }]
    }
})

const User = model('User', userSchema);
 
module.exports = User;