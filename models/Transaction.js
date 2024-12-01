// models/User.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    amount:{
        type:Number
    },
    debit:{
        type:Boolean,
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
