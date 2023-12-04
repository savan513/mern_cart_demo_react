import React, { useContext, useState } from 'react'
import { userStateContext } from './UserReducer';
import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from './helper';

function ProductCard(props) {
    const [qty,setQty] = useState(1);
    const userState = useContext(userStateContext)

    const handleQtyChange = (e)=>{
       setQty(e.target.value)
    }
    const handleAddtoCart=(id,qty)=>{
       if(userState.userLogin === true){
       const pdata = {
            "user_email" : userState.userEmail,
            "product_id" :id,
            "product_qty" : qty,
            "token" : Cookies.get("cartproject")
        }
         axios.post(BASE_URL+"addtocart",pdata)
         .then(res=>{
               alert(res.data)
         }).catch(err=>{
            console.log(err)
         })
       }
       else{
        alert("It seems you are not logged in. Please login first.")
       }
    }
    return (
        <div className='col-lg-4 col-md-6 col-sm-12 p-2'>
            <div className="card" style={{"height":"100%"}}>
                <img className="card-img-top" src={props.product_img} alt="product name" />
                <div className="card-body">
                    <h4 className="card-title">{props.product_title}</h4>
                    <div className='d-flex justify-content-around m-2'>
                    <div className="form-floating w-50">
                        <select className="form-select" id={props.product_id} name="product_qty" onChange={handleQtyChange} value={qty}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                        <label htmlFor={props.product_id} className="form-label">Select Qty:</label>
                    </div>
                    {/* <a href="#" className="btn btn-primary"><span className='align-content-center'>Add to Cart</span></a> */}
                    <button className='btn btn-primary m-1' onClick={()=> handleAddtoCart(props.product_id,qty)}>Add to Cart</button>
                    </div>
                    <p className="card-text">{props.product_desc}</p>
                    <h5>Price : {props.product_price} rs.</h5>
                    
                </div>
            </div>
        </div>
    )
}

export default ProductCard;