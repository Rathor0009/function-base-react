import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import GetAppIcon from '@mui/icons-material/GetApp';

let data : any
function UploadFile() {
    const [file, setFile] = useState();

    const handleChange = (e: any) => {
         data = e.target.files[0]
        setFile(data)
        console.log(data);
        
    }

    const onFileUpload = async () => {
        console.log(data);
        if (!data) {
            alert('Please select the file first!');
            return;
        }

        const formData = new FormData();
       
        // Update the formData object
        formData.append("file", data, data.name);
    

        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:8080/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    const onGetFile =async () => {
        let fileData;
        let filesElement = document.getElementById("list-files");
        filesElement!.innerHTML = "";
       const res = await axios.get("http://localhost:8080/files")
       console.log(res.data);
       for(let i=0;i<res.data.length;i++){
         fileData = res.data[0]
       }
       filesElement!.innerHTML = fileData.name
        console.log(filesElement!.innerHTML);
       
    }

    return (
        <div>
            <h3 className='upload'>Upload File</h3>
        <p className='upload_image'>
        {file &&
            <img
                src={URL.createObjectURL(file)}
                className='image'
                alt=""
            />
        }
            <input
                type="file"
                name="file"
                onChange={handleChange}
                accept="image/jpg,.gif,.png,.svg,.webp audio/wav,.mp3"
            />
            <br></br>
                <Button startIcon={<UploadIcon />} variant="contained" onClick={onFileUpload}>
                    Upload
                </Button>
            <br></br>
                <li id="list-files" className="upload"></li>
                <br></br>
                <Button startIcon={<GetAppIcon />} variant="outlined" onClick={onGetFile}>
                    Get Files
                </Button>
        </p>
        </div>
    );
}
export default UploadFile;
