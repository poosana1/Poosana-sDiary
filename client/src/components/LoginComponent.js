import NavbarComponent from "./NavbarComponent"
import { useState ,useEffect} from "react"
import axios from "axios"
import Swal from "sweetalert2"
import {authenticate} from "../services/authorize"
import {withRouter} from "react-router-dom" 
import { getUser } from "../services/authorize"


//props จะเก็บข้อมูลของ path ที่ทำงาน
const LoginComponent =(props)=>{

    const [state,setState] = useState({
        username:"",
        password:""
    })

    const {username,password} = state

    //กำหนดค่าให้กับ state
    const inputValue = name=>event=>{
       //แสดงค่าในช่องกรอกข้อมูล
       setState({...state,[name]:event.target.value})
   }

   const submitForm = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5500/api/login`, { username, password })
      .then(response => {
        authenticate(response, () => props.history.push("/create"));
      })
      .catch(err => {
        if (err.response && err.response.data) {
          Swal.fire('แจ้งเตือน', err.response.data.error, 'error');
        } else {
          Swal.fire('แจ้งเตือน', 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ', 'error');
        }
      });
  };

  useEffect(()=>{
    //ตอนเปิดหน้าเว็บมามีค่าของผู้ใช้ใน session storage มั้ย
    getUser() && props.history.push("/")
  },[])
  
    
    return(
        <div className = "container p-5">
        <NavbarComponent></NavbarComponent>
        <h1>เข้าสู่ระบบ | Admin</h1> 
        <form onSubmit = {submitForm}>
            <div className = "form-group">
                <label>Username</label>
                <input type="text" className = "form-control" value = {username} onChange={inputValue("username")}/>
            </div>
            <div className = "form-group">
                <label>Password</label>
                <input type="password" className = "form-control" value = {password} onChange={inputValue("password")}/>
            </div><br></br>
            <input type ="submit" value="เข้าสู่ระบบ" className = "btn btn-primary"></input>
        </form>
        
    </div>
    )

}

export default withRouter(LoginComponent)