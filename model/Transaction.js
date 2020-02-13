const { Schema, model } = require('mongoose');

const TransSchema = new Schema({
    amount:{
        type:Number
    },
    type:{
        type:String,
        require:true
    },
    note:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Transaction = model('Transaction' , TransSchema);

module.exports = Transaction;