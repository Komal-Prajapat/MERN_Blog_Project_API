import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Router/user.js";
import bodyParser from "express";
import { postRouter } from "./Router/post.js";
import cors from 'cors'
//creating Config file
const app = express();

app.use(cors({
  origin:process.env.FRONTEND_URL ,
  methods:["GET" ,"POST","PUT","DELETE"],
  credentials:true
})
)
config({
  path: ".env",
});
app.use(bodyParser.json());

//userRouter

// app.use("/",async(req,res)=>{
//   res.json({message:"this is home page"})
// })

app.use("/api", userRouter); 

app.use("/api", postRouter);

//DB Connection
mongoose
  .connect(process.env.MONGOURL, {
    dbName: "Blog_MERN",
  })
  .then(() => console.log("connected..."));

//setup server
// const port = process.env.PORT;
const port = 9090
app.listen(port, () => {
  console.log(`server is connected..${port}`);
});
 