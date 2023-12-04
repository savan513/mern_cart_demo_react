import React, { useContext, useEffect, useState } from 'react';
import Menu from './Menu';
import { userStateContext } from './UserReducer';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from './helper';



function Cart() {
    const userState = useContext(userStateContext);
    const token = Cookies.get("cartproject");
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            axios.post(BASE_URL+"getcartproducts", {
                user_email: userState.userEmail,
                token: token
            }).then(res => {
                setCartData(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [navigate, token, userState.userEmail])
    var totalPrice = 0;

    const handlePlaceOrder = () => {
        const orderData = {};
        orderData.user_email = userState.userEmail;
        orderData.token = token;
        orderData.products = [];
        cartData.forEach(product => {
            orderData.products.push({
                product_id: product.product_detail.product_id,
                product_qty: product.product_qty,
                order_price: product.product_qty * product.product_detail.product_price
            })
        })
        axios.post(BASE_URL+"placeorder",orderData)
        .then(res=>{
            alert("order placed successfully.");
            navigate("/orders")
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleRemove=(id)=>{
      const removeItem = {
        user_email : userState.userEmail,
        product_id : id,
        token : token
      }
      axios.delete(BASE_URL+"removecartproduct",{data :removeItem})
      .then(res=>{
         console.log("item removed from cart");
         const newCartData = cartData.filter(product=>{
            // if(product.product_detail.product_id !== id){
            //     return product;
            // }
            return product.product_detail.product_id !== id;
         })
         console.log("---------new cart data",newCartData)
           setCartData(newCartData);
      }).catch(err=>{
        console.log(err)
      })
    }

    return (
        <>
            {console.log("-----cart data----",cartData)}
            <Menu />

            {cartData.length === 0 ? (<h5 className='col-12 text-center m-4'>Hello {userState.userName}. You have 0 items in your cart</h5>) : (
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 text-center m-4'><h5>Hello {userState.userName}. You have {cartData.length} items in your cart</h5></div>
                    </div>

                    <div className='row'>
                        <div className='table-responsive'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Product Title</th>
                                        <th>Product Description</th>
                                        <th>Product price</th>
                                        <th>Product Qty</th>
                                        <th>Product total</th>
                                        <th>Remove Product</th>
                                    </tr>
                                </thead>
                                {cartData.map((cartData, i) => {
                                    totalPrice = totalPrice + (cartData.product_detail.product_price * cartData.product_qty)
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td><img className='img-fluid w-75' src={cartData.product_detail.product_img} alt=""></img></td>
                                                <td>{cartData.product_detail.product_title}</td>
                                                <td>{cartData.product_detail.product_desc}</td>
                                                <td>{cartData.product_detail.product_price}</td>
                                                <td>{cartData.product_qty}</td>
                                                <td>{cartData.product_detail.product_price * cartData.product_qty}</td>
                                                <td><button className='btn btn-danger' onClick={()=>{handleRemove(cartData.product_detail.product_id)}}>Remove</button></td>
                                            </tr>
                                        </tbody>

                                    )
                                })}

                            </table>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col-12 d-flex justify-content-around'>
                            <h4>Total Cart price = {totalPrice}</h4>
                            <button className='btn w-25 btn-success' onClick={handlePlaceOrder}>Order Now</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart;