import React from 'react';
import './Item.css';

const Item = (props) => {
  return (
    <div className='item'>
      <img src={`./images/${props.image}`} alt={`${props.name}.image}`} />
      <p>{props.name}</p>
      <div className="item-price">{props.price} Ft</div>
      <button>Details</button>
    </div>
  )
}

export default Item;
