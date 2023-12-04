import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import axios from 'axios';
import BASE_URL from './helper';

function ProductCardContainer() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(BASE_URL+"getallproducts").then((response) => {
            setProducts(response.data)
        }).catch((err) => {
            console.log("-----inside catch", err)
        })
    }, [])
    return (
        <>

            <div className='container'>
                <div className='row'>
                    {products.map(((product, i) => {
                        return (
                            <ProductCard key={i}
                                product_id={product.product_id}
                                product_title={product.product_title}
                                product_img={product.product_img}
                                product_desc={product.product_desc}
                                product_price={product.product_price}
                            />)
                    }))}
                </div>
            </div>

        </>
    )
}

export default ProductCardContainer;