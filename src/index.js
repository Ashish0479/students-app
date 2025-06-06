const express= require('express')
const serverConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const userRouter = require('./routes/userRoute')
const authRouter=require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const goalRouter = require('./routes/goalRoute')
const openaiRouter=require('./routes/openaiRoute')
const app = express()

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));


app.use(cookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use('/users',userRouter)
app.use('/auth', authRouter);
app.use('/goal', goalRouter);
app.use('/roadmap', openaiRouter);

app.get('/hi',(req,res)=>{
    return res.json({message:'hello'})
})
console.log(serverConfig.PORT)

app.listen(5500, async()=>{
    await connectDB();

    console.log(`server started at port ${serverConfig.PORT} ...`)
})