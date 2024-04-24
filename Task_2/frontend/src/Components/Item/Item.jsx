import React from 'react';
import './Item.css';

const Item = (props) => {
  return (
    <div className='item'>
      <img src={`/images/${props.image}`} alt='' />
      <p>{props.product_name}</p>
      <div className="item-price">{props.price} Ft</div>
      <button>Details</button>
    </div>
  )
}

export default Item;
