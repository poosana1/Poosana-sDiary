import React from "react";
import axios from "axios"
//axios ใช้ยิง request บน API
import { useState,useEffect } from "react";
//useEffect จะทำการคอล API  ตอนเริ่มต้น
import NavbarComponent from "./NavbarComponent";


const SingleComponent = (props) => {

  const [blog,setBlog] = useState('')

  
  useEffect(()=>{
    axios.get(`http://localhost:5500/api/blog/${props.match.params.slug}`).then(response=>{
      setBlog(response.data)
    }).catch(err=>alert(err))
    // eslint-disable-next-line
  },[])

  return (
    <div className="container p-5">
      <NavbarComponent/>
      <br></br>
      <h1>{blog.title}</h1>
      <br></br>
      <p>{blog.content}</p>
      <p className="text-muted">author: {blog.author} , published: {new Date(blog.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default SingleComponent;