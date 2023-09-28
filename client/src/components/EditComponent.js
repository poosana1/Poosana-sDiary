import {useState,useEffect} from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { getToken } from "../services/authorize"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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

    const handleQuillChange = (value) => {
        setState({ ...state, content: value });
    };

    const showUpdatedForm=()=>(
        <form onSubmit = {submitForm}>
                <div className = "form-group">
                    <label>Title</label>
                    <input type="text" className = "form-control" value = {title} onChange={inputValue("title")}/>
                </div>
                <br></br>
                <div className = "form-group">
                    <label>Details</label>
                    <ReactQuill value={content} onChange={handleQuillChange} style={{backgroundColor:'white'}} />
                </div>
                <br></br>
                <div className = "form-group">
                    <label>Author</label>
                    <input type="text" className = "form-control" value = {author} onChange={inputValue("author")}/>
                </div><br></br>
                <div className="form-group text-center">
                <input type ="submit" value="UPDATE" className = "btn btn-primary"></input>
                </div>
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
                'Notification',
                'Edit Successfully',
                'success'
            ).then(()=>{
                props.history.push('/')
            })
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
        <>
        <NavbarComponent></NavbarComponent>
        <div className = "container p-5">
            <br/>
            <br/>
            <h1 style={{textAlign:'center'}}>EDIT YOUR DIARY</h1> 
            {showUpdatedForm()}
            
        </div>
        </>
    )
}

export default EditComponent