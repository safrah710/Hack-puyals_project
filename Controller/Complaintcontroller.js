import express from 'express';
import Complaintservice from '../Service/Complaintservice.js';
const Complaintcontroller=express.Router();
Complaintcontroller.post('/add_complaint',Complaintservice.add_complaint);
Complaintcontroller.get('/show_complaint1',Complaintservice.show_complaint1);
Complaintcontroller.get('/show_complaint2',Complaintservice.show_complaint2);
Complaintcontroller.put('/add_remarks',Complaintservice.add_remarks);
Complaintcontroller.put('/add_status',Complaintservice.add_status);
Complaintcontroller.delete('/delete1',Complaintservice.delete_complaint_user);
Complaintcontroller.delete('/delete2',Complaintservice.delete_complaint_offl);
export default Complaintcontroller