import express from 'express';
import Ideas from '../Service/Ideaservice.js';
import Feedbackservice from '../Service/Feedbackservice.js';
const Feedbackcontroller=express.Router();
Feedbackcontroller.post('/add_feedback',Feedbackservice.add_feedback);
Feedbackcontroller.get('/get_feedback',Feedbackservice.get_feedback);
Feedbackcontroller.put('/add_remarks',Feedbackservice.add_remarks);
export default Feedbackcontroller;