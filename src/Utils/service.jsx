import axios from 'axios';
const service=axios.create({
    baseURL:'http://localhost:10000'
})
export default service;