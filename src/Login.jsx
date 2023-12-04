import React, { useContext, useEffect, useState } from 'react'
import Menu from './Menu';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { userDispatchContext} from './UserReducer';
import BASE_URL from './helper.js';



function Login() {

  const [formData, setFormData] = useState({
    user_email: "",
    user_pass: ""
  })
  const navigate = useNavigate();
  const cookieVal = Cookies.get("cartproject");
  

  const userDispatch = useContext(userDispatchContext);

  useEffect(() => { 
    if(cookieVal)
    {
      navigate("/")
    }
  }, [cookieVal, navigate])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((preState) => {
      return {
        ...preState,
        [name]: value
      }
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(BASE_URL+"loginuser", formData)
      .then((res) => {
        alert("User logged in successfully.");
        Cookies.set("cartproject", res.data.token);
        userDispatch({type : "ADD_USER_DATA",user_name : res.data.user_name,user_email : res.data.user_email})
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data) {
          if (err.response.data.errorcode === "ene") {
            alert(err.response.data.errormsg)
          }
          else if (err.response.data.errorcode === "pnc") {
            alert(err.response.data.errormsg)
          }
          else {
            alert("Something went wrong! Please try again in sometime.")
            console.log("-----------inside login catch", err)
          }
        }
        else {
          alert("Something went wrong! Please try again in sometime.")
          console.log("-----------inside login catch", err)
        }
      })
  }
  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto">
            <form className="m-4 p-3">

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input type="text" className="form-control" placeholder="Enter email" id="email" name="user_email" value={formData.user_email} onChange={handleChange} />
              </div>

              <div className="form-group my-4">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" placeholder="Enter password" id="pwd" name="user_pass" value={formData.user_pass} onChange={handleChange} />
              </div>

              <button className="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )

}

export default Login;