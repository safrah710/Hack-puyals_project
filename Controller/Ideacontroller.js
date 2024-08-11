import express from 'express';
import Ideaservice from '../Service/Ideaservice.js';
const Ideacontroller=express.Router();
Ideacontroller.post('/add_idea',Ideaservice.add_idea);
Ideacontroller.get('/show_idea1',Ideaservice.show_idea1);
Ideacontroller.get('/show_idea2',Ideaservice.show_idea2);
Ideacontroller.put('/add_remarks_idea',Ideaservice.add_remarks);
Ideacontroller.delete('/delete_offl',Ideaservice.delete_idea_official);
Ideacontroller.delete('/delete_user',Ideaservice.delete_idea_user);
export default Ideacontroller