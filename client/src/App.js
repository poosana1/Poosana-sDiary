import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
//ดึงข้อมูลมาพักใน state
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { getToken, getUser } from "./services/authorize";


function App() {
  const [blogs, setBlogs] = useState([])
  const [colorIndex, setColorIndex] = useState(0)

  const colors = ["#FCF6BD", "#D0F4DE", "#C0E4F6", "#FFBBDA", "#E8CFF8" ,"#A8D1E7", "#B3DBD8", "#F8F5FD", "#FEE5E0", "#FFBFC5"]

  // function getRandomColor() {
  //   const randomIndex = Math.floor(Math.random() * colors.length)
  //   return colors[randomIndex]
  // }
  

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
      title: "Do you want to delete this diary?",
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
    axios.delete(`http://localhost:5500/api/blog/${slug}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }).then(response => {
      Swal.fire(
        "Notification",
        "Delete Successfully",
        "success"
      )
      fetchData()
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
    <NavbarComponent />
    <div className="container p-5">
      <br />
      <br/>
      <h1 style={{textAlign:'center'}}>Team's Post it<span class="material-symbols-outlined">note_stack</span></h1>
      <br />
      <div className="row">
        {blogs.map((blog, index) => (
          <div className=" blog-container custom-col" key={index} 
          // style={{backgroundColor: getRandomColor()}}
          style={{ backgroundColor: colors[index % colors.length] }}
          >
            <Link to={`/blog/${blog.slug}`}><h2 style={{ textAlign: 'center' }}>{blog.title}</h2></Link>
            <br />
            <div  dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) }}></div>
            {blog.content.length > 150 && <p style={{ textAlign: 'center' }}>[...]</p>}
            <p className="text-muted author-info">author: {blog.author} , published: {new Date(blog.createdAt).toLocaleString()}</p>
            {getUser() && (
              <div className="button-container">
                <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>Edit</Link> &nbsp;
                <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>Delete</button>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App;