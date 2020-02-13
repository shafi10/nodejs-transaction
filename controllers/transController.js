const User = require('../model/User')
const Transaction = require('../model/Transaction')

exports.createTrans =async (req,res)=>{
    const { amount , type, note} = req.body
    const trans = new Transaction({
        amount, type, note , 
        author:req.user.id
    })
    try {
        const transa = await trans.save()
        const user = await User.findById(req.user.id);

        if(type === 'income'){
            user.balance = user.balance + amount
            user.income = user.income + amount
        }else if(type === 'expense'){
            user.balance = user.balance - amount
            user.expense = user.expense - amount
        }

        user.transaction.unshift(transa._id);

        let updateUser = await User.findByIdAndUpdate(user._id ,
            {$set: user},
            {new:true}     
            )

        res.status(201).json({transa, updateUser})
    } catch (error) {
        console.log(error)
    }
}

exports.getUserTransaction = async  (req,res)=>{
    try {
        const data = await Transaction.find({author:req.user.id});
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}