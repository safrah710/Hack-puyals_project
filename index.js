import express from 'express'
import 'dotenv/config.js';
import cors from 'cors';
const app=express();
import controller from './Controller/index.js';
app.use(express.json());
const PORT=process.env.PORT;
app.use(cors());
app.use(controller);
app.listen(PORT,()=>{
    console.log(`APP IS RUNNING AT A PORT ${PORT}`)
})