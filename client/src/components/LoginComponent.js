import NavbarComponent from "./NavbarComponent"
import { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { authenticate } from "../services/authorize"
import { withRouter } from "react-router-dom"
import { getUser } from "../services/authorize"

//props จะเก็บข้อมูลของ path ที่ทำงาน
const LoginComponent = (props) => {

  const [state, setState] = useState({
    username: "",
    password: ""
  })

  const { username, password } = state

  //กำหนดค่าให้กับ state
  const inputValue = name => event => {
    //แสดงค่าในช่องกรอกข้อมูล
    setState({ ...state, [name]: event.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5500/api/login`, { username, password })
      .then(response => {
        authenticate(response, () => props.history.push("/"));
      })
      .catch(err => {
        if (err.response && err.response.data) {
          Swal.fire('Notification', err.response.data.error, 'error');
        } else {
          Swal.fire('Notification', 'There are some conflict in log in process', 'error');
        }
      });
  };

  useEffect(() => {
    //ตอนเปิดหน้าเว็บมามีค่าของผู้ใช้ใน session storage มั้ย
    getUser() && props.history.push("/")
  }, [])


  return (
    <>
      <NavbarComponent />

      <div className="container">
        <br></br>


        <div className="container-login">
          <br></br>
          <div>
            <h1>Team's Post it<span class="material-symbols-outlined">note_stack</span></h1>
          </div>

          <br></br>
          <div className="login-box">
            <h3>LOG IN YOUR ACCOUNT</h3>
            <h4>Already Registered? Sign In</h4>
            <br></br>
            <form onSubmit={submitForm}>
              <div className="form-group">
                <label className="labelLeft">USERNAME</label>
                <input type="text" className="form-control" style={{ width: 500 }} value={username} onChange={inputValue("username")} />
              </div>
              <br></br>
              <div className="form-group">
                <label className="labelLeft">PASSWORD</label>
                <input type="password" className="form-control" value={password} onChange={inputValue("password")} />
              </div><br></br>
              <input type="submit" value="LOG IN" className="btn btn-primary"></input>
            </form>
          </div>
        </div>
      </div>
    </>
  )

}

export default withRouter(LoginComponent)