import express from 'express';
import Loginservice from '../Service/Loginservice.js';
const logincontroller=express.Router();
logincontroller.post('/user',Loginservice.login);
logincontroller.post('/create_user',Loginservice.create_login);
logincontroller.post('/admin',Loginservice.login_admin);
logincontroller.post('/officials',Loginservice.offl_login);
logincontroller.post('/create_officials',Loginservice.create_offllogin);
export default logincontroller;