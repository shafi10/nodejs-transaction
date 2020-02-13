const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.postRegistration = async (req,res)=>{
    const { name, email, password} = req.body;

    try {
        const foundUser = await User.findOne({email})
        if(foundUser){
            return res.status(400).json('User already Exists')
        }
    let hashPassword = await bcrypt.hash(password, 10)    
 
    const user = new User({
        name,email, 
        password:hashPassword,
        balance:0,
        expense:0,
        income:0,
        transaction:[]
    })
        const data = await user.save();
        res.status(201).json(data)
    } catch (error) {
        console.log(error);
    }
}

exports.postLogin=async (req,res)=>{
    const { email, password} = req.body

    try {
        const userEmail = await User.findOne({email})

        if(!userEmail){
            return res.status(400).json('invalid Credientials')
        }

        const userPass = await bcrypt.compare(password, userEmail.password);
        if(!userPass){
            return res.status(400).json('Invalid Credientials')
        }

        const payload = {
            user:{
                id:userEmail.id
            }
        }

        jwt.sign(payload, 'Secret' ,{ expiresIn: 360000}, (err, token)=>{
            if(err) throw err
             res.json({token})
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getUser= async(req,res)=>{
    try {
        const data = await User.findById(req.user.id);
        res.status(201).json(data)
    } catch (error) {
        console.log(error);
    }
}