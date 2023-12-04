import React, { useEffect, useState,useContext } from 'react'
import Menu from './Menu';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { userDispatchContext} from './UserReducer';
import BASE_URL from './helper';

function Register() {

    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        user_pass: "",
        user_cpass: ""
    })
    const navigate = useNavigate();
    const userDispatch = useContext(userDispatchContext);
    const cookieVal = Cookies.get("cartproject");

    useEffect(() => {
        if (cookieVal) {
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
    const handleRegister = (e) => {
        e.preventDefault();
        axios.post(BASE_URL+"registeruser", formData)
            .then((res) => {
                alert("User registerd with us successfully.")
                Cookies.set("cartproject", res.data.token);
                userDispatch({type : "ADD_USER_DATA",user_name : res.data.user_name,user_email : res.data.user_email})
                navigate("/")
            })
            .catch((err) => {
                if (err.response.data) {
                    if(err.response.data.name === "ValidationError"){
                        alert("Email id is not in valid formate! Pease enter valid email id");
                    }
                    else if (err.response.data.errorcode === "pacpns") {
                        alert(err.response.data.errormsg)
                    }
                    else if (err.response.data.errorcode === "eae") {
                        alert(err.response.data.errormsg)
                    }
                    else {
                        alert("Something went wrong! Please try again in sometime.")
                        console.log("-----------inside register catch", err)
                    }
                }
                else {
                    alert("Something went wrong! Please try again in sometime.")
                    console.log("-----------inside register catch", err)
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
                                <label htmlFor="uname">User Name:</label>
                                <input type="text" className="form-control" placeholder="Enter username" id="uname" name="user_name" value={formData.user_name} onChange={handleChange} />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="email">Email Address:</label>
                                <input type="text" className="form-control" placeholder="Enter email" id="email" name="user_email" value={formData.user_email} onChange={handleChange} />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="pwd">Password:</label>
                                <input type="password" className="form-control" placeholder="Enter password" id="pwd" name="user_pass" value={formData.user_pass} onChange={handleChange} />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="cpwd">Confirm Password:</label>
                                <input type="password" className="form-control" placeholder="Re-enter password" id="cpwd" name="user_cpass" value={formData.user_cpass} onChange={handleChange} />
                            </div>
                            <button className="btn btn-primary mt-4" onClick={handleRegister}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register;