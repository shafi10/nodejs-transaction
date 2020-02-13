const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
const config = require('config')


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(require('./routes/userRoutes'))
app.use(require('./routes/transRoute'))

app.use('/', (req,res)=>{
    res.json('Welcome to homepage')
})

const PORT = process.env.PORT || 3000;
mongoose.connect(`mongodb://${config.get('user')}:${config.get('password')}@ds037637.mlab.com:37637/transaction`, (req,res)=>{
    console.log('Database connected')
});
app.listen(PORT, (req,res)=>{
    console.log(`server listen on port ${PORT}`)
})