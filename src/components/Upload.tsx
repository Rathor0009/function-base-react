import axios from 'axios';
import React, { useState } from 'react';
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
        axios.post("http://localhost:8080/upload", formData);
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
                <button className='btn btn-primary' onClick={onFileUpload}>
                    Upload
                </button>
        </p>
        </div>
    );
}
export default UploadFile;
