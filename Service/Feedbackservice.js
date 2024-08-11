import { client, dbname1 } from '../Model/index.js';

const add_feedback = async (req, res) => {
    try {
        await client.connect();
        const feedback = req.body.feedback;
        const city = req.body.city;
        const remarks="";
        const db = client.db(dbname1); 
        await db.collection('feedback_details').insertOne({ feedback, city,remarks });
        res.status(200).send({
            message: "Feedback added successfully"
        });
    } catch (err) {
        res.status(400).send({
            message: err.message || 'Internal error'
        });
    } finally {
        await client.close(); 
    }
};
const get_feedback = async (req, res) => {
    try {
        await client.connect();
        const city = req.query.city;
        const db = client.db(dbname1); 
        let payload=await db.collection('feedback_details').find({city:req.query.city}).toArray();
        res.status(200).send({
            data:payload,
            message: "Feedback fetched successfully"
        });
    } catch (err) {
        res.status(400).send({
        
            message: err.message || 'Internal error'
        });
    } finally {
        await client.close(); 
    }
};
const add_remarks=async(req,res)=>{
    await client.connect()
    try{
         let db=client.db(dbname1);
         console.log(req.query.Name);
         console.log(req.query.remarkText)
         await db.collection('feedback_details').updateMany(
            { feedback: req.query.feedback },
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
export default { add_feedback,get_feedback,add_remarks};
