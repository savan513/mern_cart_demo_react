import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { userDispatchContext} from './UserReducer';

function Menu() {
    const Navigate = useNavigate();
    const cookieVal = Cookies.get("cartproject");
    const userDispatch = useContext(userDispatchContext);

    const handleLogout = () => {
        Cookies.remove("cartproject");
        userDispatch({type : "REMOVE_USER_DATA"})
        Navigate("/")
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top p-3">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Savan Shop</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ml-auto" id="collapsibleNavbar">
                        <ul className="navbar-nav ms-auto h5">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            {cookieVal ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/orders">Orders</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/cart">My Cart</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                </>
                            )}



                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menu;