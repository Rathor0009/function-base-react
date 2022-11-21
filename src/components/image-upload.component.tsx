// import { useEffect, useState } from 'react';
// import {FileBase64} from 'react-file-base64';
// import { createItem, getItems } from '../functions';
// function App() {
// const [item, setItem] = useState({ title: '', image: '' });
// const [items, setItems] = useState([])
// const onSubmitHandler = async (e:any) => {
// e.preventDefault();
// const result = await createItem(item);
// setItems([...items, result]);
// }
// useEffect(() => {
// const fetchData = async () => {
// const result = await getItems();
// console.log('fetch data;m', result)
// setItems(result)
// }
// fetchData()
// }, [])
// return (
// <div className="container">
// <pre>{JSON.stringify(item, null, '\t')}</pre>
// <form action="" onSubmit={onSubmitHandler}>
// <input type="text" className="input-field"
// onChange={e => setItem({ ...item, title: e.target.value })}
// />
// <FileBase64
// type="file"
// multiple={false}
// onDone={({ base64 }) => setItem({ ...item, image: base64 })}
// />
// <div className="right-align">
// <button className="btn">submit</button>
// </div>
// </form>
// {items?.map(item => (
// <div className="card" key={item._id}>
// <div className="card-image waves-effect waves-block waves-light">
// <img className="activator" style={{ width: '100%', height: 300 }} src={item.image} />
// </div>
// <div className="card-content">
// <span className="card-title activator grey-text text-darken-4">{item.title}</span>
// </div>
// </div>
// ))}
// </div>
// );
// }
// export default App;

// import "./App.css"
import axios from 'axios'
import { useState,useEffect } from "react"
 function Image(){
    const [data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080').
        then((res)=>{setData(res.data),console.log(res.data);
        }).
        catch((err)=>console.log(err,
            "this is an errror")
        )
    })

    return(
        <div className="image">
            <h1>image uploading react</h1>
            {/* {
                data.map((singleData)=>{
                    const base64String=btoa(
                        String.fromCharCode(...new Uint8Array(singleData))
                    )
                })
            } */}
        </div>
    )
 }
 export default Image