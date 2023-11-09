import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContex } from "../../context/AppContex";
import M from "materialize-css";
import Loader from './Loader'

const Home = () => {
  const videoRef=useRef(null);
  const [loading,setLoading]=useState(true);
  const navigate=useNavigate();
  const followModel = useRef(null);
  const commentModel=useRef(null);
  const LikeModel=useRef(null);
  const { logged_user } = useContext(AppContex);
  const {getdata} =useContext(AppContex);
  const [TotalData, setTotalData] = useState([]);
  const [allFollowers, setAllFollowers] = useState([]);
  const [allComment,setAllComments]=useState([]);
  const [alllike,setallLike]=useState([]);
  const [comment, setComment] = useState("");
  

  // fetching All post in home page 
  const fetchdata = async () => {
    getdata();
    setLoading(true);
    const data = await fetch("/api/v1/post/get-allpost", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    const res = await data.json();
    setTotalData(res.posts);
    setLoading(false);
  };

  // fetching all comments details if we are click comment .
  const ViewAllComment=(id)=>{
    var instance = M.Modal.init(commentModel.current);
    instance.open();
    fetch(`/api/v1/post/getAllcomment/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => setAllComments(data.comment));
  }

  // fetching all likes and see all the users who are liking the post .
  const ViewAllLikes=(id)=>{
    var instance = M.Modal.init(LikeModel.current);
    instance.open();
    fetch(`/api/v1/post/getAlllikes/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then(data=>setallLike(data.likes));
  }

//  feching  and showing all follower ...........
  const handleModelFollow = (id) => {
    var instance = M.Modal.init(followModel.current);
    instance.open();
    fetch(`/api/v1/userP/allfollower/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => setAllFollowers(data.all_followers));
  };

  // for like and unlike action  one a post 
  const LikeandUnlike = async (id) => {
      const data=await fetch("/api/v1/post/like-unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
   const res=await data.json();
   {if(res.message!=='post unlike'){
    M.toast({html:res.message,classes:'#43a047 green darken-1'})
    }
   else{
     M.toast({html:res.message,classes:'#d32f2f red darken-2'})
    }}
    fetchdata();
  };

  // for comment action on a post.
  const CommentSubmit = (e, id) => {
    e.preventDefault();
    fetch("/api/v1/post/comments", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
        text: comment,
      }),
    })
      .then((res) => res.json()).then(data=>
        {if(data.success){
          M.toast({html:data.message,classes:'#43a047 green darken-1'})
          }
       else{
        M.toast({html:data.message,classes:'#d32f2f red darken-2'})
       }})
      .catch((err) => console.log(err));

      setComment('');
      fetchdata();
  };


  useEffect(() => {
    fetchdata();
  }, []);
  return (
    loading?(<Loader></Loader>):(
        <div className="home">
        {TotalData?.map((items, index) => (
          <div key={index} className="card home-card">
            <div style={{ display: "flex" }}>
              <img
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "25px",
                  padding: "3px",
                  margin: "4px",
                }}
                src={items.posttedBy.profilePic}
                alt="no img"
              ></img>
              <h5
                style={{
                  fontSize: "xx-large",
                  fontWeight: "bold",
                  padding: "5px",
                  marginTop: "3px",
                }}
              >
                <Link to={"/userProfile/" + items.posttedBy._id}>
                  {items.posttedBy.name}
                </Link>
              </h5>
              <h5
                onClick={() => handleModelFollow(items.posttedBy._id)}
                data-target="modal1"
                className="waves-effect waves-light btn modal-trigger"
                style={{
                  float: "right",
                  fontSize: "normal",
                  marginLeft: "auto",
                  fontWeight: "190px",
                  marginRight: "5px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                {items.posttedBy.followers.length} Followers
              </h5>
            </div>
  
            <div className="card-image">
              {(items.photo.substr(items.photo.length-3))==="mp4"?<video src={items.photo}  loop  controls ></video>:
              <img src={items.photo} alt="no pic"></img>}
            </div>
            <div className="card-content">
              <div style={{ display: "flex", columnGap: "50px" }}>
                <div style={{ display: "flex", columnGap: "5px" ,cursor:'pointer'}}>
                {
                  items.likes.includes(logged_user.user_id)?(<i
                    className="material-icons"
                    onClick={() => {
                      LikeandUnlike(items._id);
                    }}
  
                  >
                    favorite
                  </i>):( <i
                    className="material-icons"
                    onClick={() => {
                      LikeandUnlike(items._id);
                    }}
  
                  >
                    favorite_border
                  </i>)

                  

                }
                 
                  <h5 style={{ marginTop: "5px" }} data-target="modalC1"
                  onClick={()=>ViewAllLikes(items._id)}
                   >{items.likes.length} likes</h5>
                </div>
  
                <div data-target="modalC1" onClick={()=>ViewAllComment(items._id)} style={{ display: "flex", columnGap: "10px" ,cursor:"pointer"}}>
                  <i  className="material-icons">chat_bubble_outline</i>
                  <p >{items.Comment.length} comments</p>
                </div>
              </div>
  
              <div style={{ marginTop: "10px", marginBottom: "5px" }}>
                <h6 style={{ fontWeight: "bold" }}>{items.title}</h6>
                <p>{items.body}</p>
              </div>
              <hr></hr>
              <div style={{ marginTop: "20px" }}>
                <div style={{ font: "icon", fontWeight: "15px" ,marginBottom:'6px'}}>Comments</div>
                {items.Comment.length>0?<p style={{color:'red'}}><span >{items.Comment[items.Comment.length-1].user}-----</span>{items.Comment[items.Comment.length-1].text}</p>:<p style={{color:'red'}}>No comments</p>}
              </div>
  
              <form onSubmit={(e) => CommentSubmit(e, items._id)}>
                <input
                  type="text"
                  placeholder="add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></input>
              </form>
            </div>
  
    {/* ------------------------------------------------------------------------------------- */}
            {/* Likes Modal data */}
  
            <div
              id="modalL1"
              className="modal"
              ref={LikeModel}
              style={{ height: "auto", width: "30%" }}
            >
              <div className="modal-content">
                <h4 style={{ fontSize: "xx-large", fontWeight: "bolder",marginBottom:'15px'}}>
                  Likes
                </h4>
                <div>{
                 alllike.map((items ,index)=>(<div key={index} style={{color:'blueviolet',fontSize:'15px', fontWeight:"bold" ,marginRight:'10px'}}>{items.name}</div>))
                }</div>
              </div>
              <div className="modal-footer">
                <button className="btn waves-effect waves-light" onClick={()=>{navigate('/')}}>
                  Close
                </button>
              </div>
            </div>
  
  
            {/* comment Model data  */}
            <div
              id="modalC1"
              className="modal"
              ref={commentModel}
              style={{ height: "auto", width: "30%" }}
            >
              <div className="modal-content">
                <h4 style={{ fontSize: "xx-large", fontWeight: "bolder",marginBottom:'15px'}}>
                  Comments
                </h4>
                <div>{
                 allComment.map((items,index)=>(<div key={index}><span style={{color:'blueviolet',fontSize:'15px', fontWeight:"bold" ,marginRight:'10px'}}>{items.user}</span><span style={{color:"greenyellow"}}>{items.text}</span></div>))
                }</div>
              </div>
              <div className="modal-footer">
                <button className="btn waves-effect waves-light" onClick={()=>{navigate('/')}}>
                  Close
                </button>
              </div>
            </div>
  
  
  
            {/*Follow MOdel data staucture */}
            <div
              id="modal1"
              className="modal"
              ref={followModel}
              style={{ height: "auto", width: "30%" }}
            >
              <div className="modal-content">
                <h4 style={{ fontSize: "xx-large", fontWeight: "bolder",marginBottom:'15px'}}>
                  Followers
                </h4>
                {allFollowers.map((items,index) => (
                  <div key={index} style={{ fontSize: "large", fontWeight: "bold" ,color:'blue'}}>
                   <span>......   </span> {items.name}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat">
                  Close
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )
      
     
    
   
  );
};

export default Home;
