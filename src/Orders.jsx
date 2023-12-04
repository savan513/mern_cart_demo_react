import React, { useContext, useEffect, useState } from 'react'
import Menu from './Menu';
import { userStateContext } from './UserReducer';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from './helper';

function Orders() {
    const userState = useContext(userStateContext);
    const token = Cookies.get("cartproject");
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
        if (!token) {
            navigate("/")
        }
        else {
            axios.post(BASE_URL+"getorderhistory", {
                user_email: userState.userEmail,
                token: token
            }).then(res => {
                setOrderData(res.data)
            }).catch(err => {
                console.log(err);
            })
        }
    }, [token, navigate, userState.userEmail])

    return (
        <>
            <Menu />
            {console.log("------order data-----", orderData)};
            {orderData.length === 0 ? (<h5 className='col-12 text-center m-4'>Hello {userState.userName}. You didn't order anything yet.</h5>) : (
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 text-center m-4'><h5>Hello {userState.userName}. You have {orderData.length} items in your Order History</h5></div>
                    </div>
                    <div className='row'>
                        <div className='table-responsive'>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Order Date</th>
                                    <th>Product Image</th>
                                    <th>Product Title</th>
                                    <th>Product Description</th>
                                    <th>Product price</th>
                                    <th>Product Qty</th>
                                    <th>Order Price</th>
                                    </tr>
                                </thead>
                                {orderData.map((product,i) => {
                                    
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                            <td> {new Date(product.order_date).toLocaleDateString()}</td>
                                            <td><img className='img-fluid w-75' src={product.product_detail.product_img} alt=""></img></td>
                                            <td>{product.product_detail.product_title}</td>
                                            <td>{product.product_detail.product_desc}</td>
                                            <td>{product.product_detail.product_price}</td>
                                            <td>{product.product_qty}</td>
                                            <td>{product.product_detail.product_price * product.product_qty}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Orders;