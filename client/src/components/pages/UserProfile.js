import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Loader from './Loader';
import { AppContex } from '../../context/AppContex';
import M from "materialize-css";

const UserProfile = () => {
  const [loading ,setLoading]=useState(true);
  const [post,setPost]=useState([]);
  const [name,setname]=useState('');
  const [followers,setFollower]=useState([]);
  const [countFollowing,setFollowing]=useState(0);
  const [countFollowers,setFollowers]=useState(0);
  const [profilePic,setProfilePic]=useState('');
  const {logged_user} =useContext(AppContex);
  const {id}=useParams();

  // finding all post of acorasponding user
 const findAllpost=async()=>{
   setLoading(true);
    const data=await fetch(`/api/v1/userP/profile/${id}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    });
    const res=await data.json();
    console.log('userprofile',res);
    setPost(res.user.posts);
    setname(res.user.name);
    setFollower(res.user.followers);
    setFollowing(res.user.following.length);
    setFollowers(res.user.followers.length);
    setProfilePic(res.user.profilePic);
    setLoading(false);
 }
  
//  follow and unfollow function 
 const followUnfollow=async()=>{
  const data=await fetch(`/api/v1/userP/follow/${id}`,{
    method:'PUT',
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:{
       id
    }
  });
  const res=await data.json();
  {if(res.message!=='unfollow successfully'){
    M.toast({html:res.message,classes:'#43a047 green darken-1'})
    }
   else{
     M.toast({html:res.message,classes:'#d32f2f red darken-2'})
    }}
 }

  useEffect(()=>{
    findAllpost();
  },[])
  return (
    loading?(<Loader></Loader>):(
      <div style={{maxWidth:'1050px', margin:'0px auto'}}>
    <div style={{display:'flex',justifyContent:'space-evenly' ,margin:'18px 0px 18px 0px',borderBottom:'1px solid grey',paddingBottom:'20px'}}>
      <div >
        <img style={{width:'160px',height:"160px", borderRadius:'80px'}} src={profilePic} alt='opps'/>
      </div>
      <div style={{marginTop:'45px'}}>
      <div style={{display:'flex' }}>
      <h4 style={{fontSize:'40px', marginBottom:'15px' , fontWeight:'bold' ,marginRight:'80px'}}>{name}</h4>
      <button style={{marginTop:'10px'}} className="btn waves-effect waves-light" onClick={followUnfollow}>{followers.includes(logged_user.user_id)?(<div style={{color:'Yellow'}}>Unfollow</div>):(<div>Follow</div>)}</button>
      </div>   
        <div style={{display:'flex', flexDirection:'row' ,justifyContent:'space-between',fontSize:'20px',width:'118%'}}>
          <h5>{post.length} {post.length>1?"posts":"post"}</h5>
          <h5>{countFollowers} Followers</h5>
          <h5>{countFollowing} Following</h5>
        </div>
      </div>
    </div>
    <div div className='gallery'>
    {
      post.map((items,index)=>{return (
        <div key={index} className='item'>
        {items.photo.substr(items.photo.length-3)==='mp4' ?<video src={items.photo} controls></video>:<img   src={items.photo} alt='NO IMAGE FOUND'/>}
        <p style={{fontSize:'xx-large', fontWeight:'bolder'}}>{items.title}</p>
        <p style={{fontSize:'large',fontWeight:'bold'}}>{items.body}</p>
        <div style={{display:'flex',columnGap:'30px'}}>
        <p style={{color:'blue', fontWeight:'bold'}}>{items.likes.length} likes</p>
        <p style={{color:'blueviolet', fontWeight:"bold"}}>{items.Comment.length} comments</p>
        </div>
       
        </div>
        
      )})
    }

      
      
    </div>
    </div>
    )
    
 
  )
}

export default UserProfile;