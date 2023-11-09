import React, { useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
   const [title,setTitle]=useState('');
   const [body,setBody]=useState('');
   const navigate=useNavigate();

  //  file state valiable
   const [selectImage,setSelectImage]=useState(null);
   const [imageUrl,setImageUrl]=useState();
   
   const SubmitHandeler=(e)=>{
       e.preventDefault();
      //  creating formdata
       const formdata=new FormData();
       formdata.append('title',title);
       formdata.append('body',body);
       formdata.append('photo',selectImage);

       axios.post('/api/v1/post/createpost', formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
        }).then((res)=>{
           if(res.data.success){
            M.toast({html: res.data.message,classes:'#43a047 green darken-1'})
           }
           else{
            M.toast({html: res.data.message,classes:'#d32f2f red darken-2'})
           }
       }).catch((err)=>{console.log(err)});
       
       setTitle('');
       setBody('');
       setSelectImage(null);
       navigate('/');
   }
  return (
    <div>
    <div className='card input-filed' style={{
        margin:'20px auto',
        maxWidth:'400px',
        padding:'20px',
        textAlign:'center'
    }}>
    <form onSubmit={SubmitHandeler}>
            

    <input type='text' placeholder='TITLE'  onChange={(e)=>{setTitle(e.target.value)}}/>
      <input type='text' placeholder='BODY'  onChange={(e)=>{setBody(e.target.value)}}/>
      <div className="file-field input-field">
      <div className="btn">
        <span>Upload image or video</span>
        <input type="file"  onChange={(e)=>
         {
             setSelectImage(e.target.files[0]);
             setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light #64b5f6 blue darken-100"  >Submit post</button>

    </form>
     
    </div>
    <div style={{
        margin:'20px auto',
        maxWidth:'400px',
        padding:'20px',
        textAlign:'center'
    }}>
     <img src={imageUrl}></img>

    </div>
   
    </div>
  )
}

export default CreatePost;