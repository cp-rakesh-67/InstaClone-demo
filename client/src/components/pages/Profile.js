import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AppContex } from '../../context/AppContex';
import Loader from './Loader';
import M from "materialize-css";

const Profile = () => {

  const [loading ,setLoading]=useState(true);
  const [post,setPost]=useState([]);
  const [name,setname]=useState('');
  const [profileImage,setProfileImage]=useState(null);
  const {logged_user}=useContext(AppContex);

// for finding all post of a userLogin.
 const findAllpost=async()=>{
   setLoading(true);
    const data=await fetch('/api/v1/post/mypost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    });
    const res=await data.json();
    setPost(res.posts);
    setname(res.user);
    setLoading(false);
 }

//  for uploading profilePic
 const UploadProfile=()=>{
  const formdata=new FormData();
  formdata.append('Profilepic',profileImage);
  axios.post('/api/v1/userP/uploadProfilepic', formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
  }).then(res=>M.toast({html:res.data.message,classes:'#43a047 green darken-1'}));
}


// delete a post
 const DeleteHandle=(id)=>{
  fetch(`/api/v1/post/delete/${id}`,{
    method:'DELETE',
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res=>M.toast({html:'Post Deleted Successfully !! please reload !!',classes:'#d32f2f red darken-2'}));
 }

  useEffect(()=>{
    findAllpost();
  },[])
  return (
    loading?(<Loader></Loader>):(
      <div style={{maxWidth:'1050px', margin:'0px auto'}}>
    <div style={{display:'flex',justifyContent:'space-evenly' ,margin:'18px 0px 18px 0px',borderBottom:'1px solid grey',paddingBottom:'20px'}}>
      <div style={{display:'flex' ,flexDirection:'column'}}>
        <img style={{width:'160px',height:"160px", borderRadius:'80px' ,marginLeft:'130px'}} src={logged_user!=null?logged_user.user_profile:'no image'} alt='opps'/>
      <div style={{display:'flex',marginTop:'10px'}}>
      <input type='file' onChange={e=>setProfileImage(e.target.files[0])}></input>
        <button className="btn waves-effect waves-light #64b5f6 blue darken-100"  onClick={UploadProfile}>update Profile Img</button>
      </div>
       
      </div>
      <div style={{marginTop:'45px'}}>
        <h4 style={{fontSize:'40px', marginBottom:'15px' , fontWeight:'bold'}}>{name}</h4>
        <div style={{display:'flex', flexDirection:'row' ,justifyContent:'space-between',fontSize:'20px',width:'118%'}}>
          <h5>{post.length} {post.length>1?"posts":"post"}</h5>
          <h5>{logged_user!=null?logged_user.followers.length:'0'} Followers</h5>
          <h5>{logged_user!=null?logged_user.following.length:'0'} Following</h5>
        </div>
      </div>
    </div>
    <div className='gallery'>
    {
      post.map((items,index)=>{return (
        <div key={index} className='item'>
        <i  className="material-icons" onClick={()=>DeleteHandle(items._id)} style={{cursor:'pointer'}}>delete</i>
        {items.photo.substr(items.photo.length-3)==='mp4' ?<video src={items.photo} controls></video>:<img   src={items.photo} alt='NO IMAGE FOUND'/>}
        </div>
        
      )})
    }

      
      
    </div>
    </div>
    )
    
  )
}

export default Profile;