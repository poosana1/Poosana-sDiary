import {useState,useEffect} from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { getToken } from "../services/authorize"

const EditComponent=(props)=>{
    //input
    const [state,setState] = useState({
        title:"",
        content:"",
        author:"",
        slug:""
    }) 

    const {title,content,author,slug} = state

    //กำหนดค่าให้กับ state
    const inputValue = name=>event=>{
        //แสดงค่าในช่องกรอกข้อมูล
        setState({...state,[name]:event.target.value})
    }

    const showUpdatedForm=()=>(
        <form onSubmit = {submitForm}>
                <div className = "form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className = "form-control" value = {title} onChange={inputValue("title")}/>
                </div>
                <div className = "form-group">
                    <label>เนื้อหาบทความ</label>
                    <textarea type="text" className = "form-control" value = {content} onChange={inputValue("content")}/>
                </div>
                <div className = "form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className = "form-control" value = {author} onChange={inputValue("author")}/>
                </div><br></br>
                <input type ="submit" value="อัพเดท" className = "btn btn-primary"></input>
            </form>
    )

    const submitForm = (e) =>{
        e.preventDefault(); 
        console.log("API URL",process.env.REACT_APP_API)
        axios.put(`http://localhost:5500/api/blog/${slug}`,{title,content,author},{
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        }).then(response=>{
            Swal.fire(
                'แจ้งเตือน',
                'แก้ไขข้อมูลเรียบร้อย',
                'success'
            )
            const {title,content,author,slug} = response.data
            //เคลียร์ช่อง input
            setState({...state,title,content,author,slug})
        }).catch(err=>{
            alert(err)
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:5500/api/blog/${props.match.params.slug}`).then(response=>{
          const {title,content,author,slug} = response.data
          setState({...state,title,content,author,slug})
        }).catch(err=>alert(err))
        // eslint-disable-next-line
      },[])

    return(
        <div className = "container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>เขียนบทความ</h1> 
            {showUpdatedForm()}
            
        </div>
    )
}

export default EditComponent