const express= require('express')
const serverConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const userRouter = require('./routes/userRoute')
const authRouter=require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const goalRouter = require('./routes/goalRoute')
const openaiRouter=require('./routes/openaiRoute')
const contentRouter=require('./routes/contentSuggestionRouter')
const notificationRouter = require("./routes/notificationRoute");



const app = express()

const cors = require('cors');


const allowedOrigins = [
  "https://pathvibe.vercel.app",
  "https://student-app-frontend-crl0.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(cookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use('/users',userRouter)
app.use('/auth', authRouter);
app.use('/goal', goalRouter);
app.use('/roadmap', openaiRouter);
app.use('/content', contentRouter);
app.use("/notifications", notificationRouter);

app.get('/hi',(req,res)=>{
    return res.json({message:'hello'})
})

app.get("/api/quote", async (req, res) => {
  const response = await fetch("https://zenquotes.io/api/today");
  const data = await response.json();
  res.json(data);
});

console.log(serverConfig.PORT)

app.listen(5500, async()=>{
    await connectDB();

    console.log(`server started at port ${serverConfig.PORT} ...`)
})
