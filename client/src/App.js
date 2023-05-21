import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
//ดึงข้อมูลมาพักใน state
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { getToken, getUser } from "./services/authorize";

function App() {
  const [blogs, setBlogs] = useState([])

  //ดึงข้อมูลบทความทั้งหมดจาก API
  const fetchData = () => {
    axios.get(`http://localhost:5500/api/blogs`).then(response => {
      setBlogs(response.data)
    }).catch(err => alert(err)
    )
  }
  useEffect(() => {
    fetchData()
  }, [])

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณต้องการลบบทความหรือไม่",
      icon: "warning",
      showCancelButton: true
    }).then((result) => {
      //กดปุ่มตกลง
      if (result.isConfirmed) {
        //ส่ง request ไปที่ api เพื่อลบข้อมูล

        deleteBlog(slug)
      }

    })
  }
  //ลบบทความ
  const deleteBlog = (slug) => {
    axios.delete(`http://localhost:5500/api/blog/${slug}`,{
      headers:{
        Authorization:`Bearer ${getToken()}`
      }
    }).then(response=>{
      Swal.fire(
        "Deleted!",
        "ลบบทความเรียบร้อย",
        "success"
      )
      fetchData()
    }).catch(err=>{
        console.log(err)
    })
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div className="row" key={index}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}><h2>{blog.title}</h2></Link>
            <p>
              {blog.content.substring(0, 260)}
              {blog.content.length > 260 && "[...]"}
            </p>
            <p className="text-muted">author: {blog.author} , published: {new Date(blog.createdAt).toLocaleString()}</p>
            {getUser() && (
              <div><Link className="btn btn-outline-success" to ={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
              <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>ลบบทความ</button></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;