import axios from 'axios';
const url = "http://localhost:5000/items";
export const getItems = ()=>axios.get(url);
export const createItem = (item:any)=>axios.post(url,item);