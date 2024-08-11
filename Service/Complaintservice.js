import {client,dbname1,dbname2} from '../Model/index.js';
import 'dotenv/config.js';
import nodemailer from 'nodemailer'

const add_complaint=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         const remarks="";
         const status="submittes"
         const {Name,email,date,complaint,district,city}=req.body;
         await db.collection('complaints1').insertOne({
            Name,email,date,complaint,district,city,remarks,status
         })
         await db.collection('complaints2').insertOne({
            Name,email,date,complaint,district,city,remarks,status
         })
         res.status(200).send({
            message:"Complaint sent successfully"
         })
    }
    catch(err){
         res.status(400).send({
            message:err.message ||'Internal server error'
         })
    }
    finally{
        await client.close()
    }
}
const add_status=async(req,res)=>{
   await client.connect()
   try{
        let db=client.db(dbname1);
        console.log(req.query.Name);
        console.log(req.query.status)
        const email1=req.query.email;
        console.log(email1);
        await db.collection('complaints1').updateMany(
         { Name: req.query.Name },
         { $set: { status: req.query.status } } 
       );
       await db.collection('complaints2').updateMany(
         { Name: req.query.Name },
         { $set: { status: req.query.status } } 
       );
       const email = nodemailer.createTransport({
         service:'gmail',
         host: 'smtp.gmail.com', 
         port: 587,              
         secure: false,  
         auth: {
             user:process.env.USER,
             pass:process.env.PSWD
         }
      });
        await email.sendMail({
            from: process.env.USER,
            to: 'azsafrah@gmail.com',
            subject: 'Complaint Status Update',
            text: `The status of your complaint has been updated to: ${req.query.status}`
        });

        res.status(200).send({
           message:"Data added successfully and email sent.",
        })
   }
   catch(err){
        res.status(400).send({
           message:err.message ||'Internal server error'
        })
   }
   finally{
       await client.close()
   }
}

const show_complaint1=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         console.log(req.query.name)
         let payload=await db.collection('complaints1').find({Name:req.query.name}).toArray()
         console.log(payload);
         res.status(200).send({
            message:"data fetched successfully",
            data:payload
         })
    }
    catch(err){
         res.status(400).send({
            message:err.message ||'Internal server error'
         })
    }
    finally{
        await client.close()
    }
}
const show_complaint2=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         console.log(req.query.city);
         let payload=await db.collection('complaints2').find({city:req.query.city}).toArray()
         res.status(200).send({
            message:"data fetched successfully",
            data:payload
         })
    }
    catch(err){
         res.status(400).send({
            message:err.message ||'Internal server error'
         })
    }
    finally{
        await client.close()
    }
}
const add_remarks=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         console.log(req.query.Name);
         console.log(req.query.remarkText)
         await db.collection('complaints1').updateMany(
            { Name: req.query.Name },
            { $set: { remarks: req.query.remarkText } } 
          );
          await db.collection('complaints2').updateMany(
            { Name: req.query.Name },
            { $set: { remarks: req.query.remarkText } } 
          );
        
         res.status(200).send({
            message:"data added  successfully",
         })
    }
    catch(err){
         res.status(400).send({
            message:err.message ||'Internal server error'
         })
    }
    finally{
        await client.close()
    }
}
const delete_complaint_user=async(req,res)=>{
    await client.connect()
    try{
      console.log(req.query.Name);
         let db=client.db(dbname1);
         await db.collection('complaints1').deleteOne({Name:req.query.Name});
         res.status(200).send({
            message:"data deleted successfully successfully",
         })
    }
    catch(err){
         res.status(400).send({
            message:err.message ||'Internal server error'
         })
    }
    finally{
        await client.close()
    }
}
const delete_complaint_offl=async(req,res)=>{
   await client.connect()
   try{
        let db=client.db(dbname1);
        //console.log(city);
        await db.collection('complaints2').deleteOne({Name:req.query.Name});
        res.status(200).send({
           message:"data deleted successfully successfully",
        })
   }
   catch(err){
        res.status(400).send({
           message:err.message ||'Internal server error'
        })
   }
   finally{
       await client.close()
   }
}
export default {add_complaint,show_complaint1,show_complaint2,add_remarks,delete_complaint_user,delete_complaint_offl,add_status
}