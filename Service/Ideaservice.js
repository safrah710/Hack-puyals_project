import {client,dbname1,dbname2} from '../Model/index.js';
const add_idea=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         const remarks="";
         const {Name,email,date,idea,district,city}=req.body;
         await db.collection('idea1').insertOne({
            Name,email,date,idea,district,city,remarks
         })
         await db.collection('idea2').insertOne({
            Name,email,date,idea,district,city,remarks
         })
         res.status(200).send({
            message:"idea sent successfully"
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
const show_idea1=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         console.log(req.query.name)
         let payload=await db.collection('idea1').find({Name:req.query.name}).toArray()
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
const show_idea2=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         console.log(req.query.city);
         let payload=await db.collection('idea2').find({city:req.query.city}).toArray()
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
        console.log("jwbdcoube")
         let db=client.db(dbname1);
         console.log(req.query.Name);
         console.log(req.query.remarkText)
         await db.collection('idea1').updateMany(
            { Name: req.query.Name, remarks: "" }, 
            { $set: { remarks: req.query.remarkText } }
        );
        await db.collection('idea2').updateMany(
            { Name: req.query.Name, remarks: "" }, 
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
const delete_idea_official=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         await db.collection('idea2').deleteOne({city:req.query.city});
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
const delete_idea_user=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         await db.collection('idea1').deleteOne({Name:req.query.Name});
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
export default {add_idea,show_idea1,show_idea2,add_remarks,delete_idea_official,delete_idea_user}