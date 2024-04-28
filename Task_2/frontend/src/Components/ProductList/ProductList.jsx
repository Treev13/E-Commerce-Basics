import React from 'react';
import './ProductList.css';
import Item from '../Item/Item';

const ProductList = ({products}) => {
  
  return (
    <div className='product-list'>
        <h1>Available Products:</h1>
        <hr />
        <div className="product-card">
            {products.map((item,i)=>{
                return <Item key={i} 
                                id={item.id}
                                image={item.image_url}
                                name={item.product_name}
                                price={item.price}/>
            })}
        </div>
    </div>
  )
}

export default ProductList;
