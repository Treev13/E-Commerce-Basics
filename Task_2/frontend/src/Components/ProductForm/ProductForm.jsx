import { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

const ProductForm = ({ onSave, disabled }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [file, setFile] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setNameError('');
    setPriceError('');

    if ('' === name) {
      setNameError('Please enter a name');
      return;
    };

    if ('' === price) {
      setPriceError('Please enter a price');
      return;
    };

    if (price <= 0 || price % 1 !== 0) {
      setPriceError('Please enter a positive whole number');
      return;
    };

    const imageForm = new FormData();
    imageForm.append('file', file)
    axios.post('/api/products/upload', imageForm)
    const formData = new FormData(event.target);
    formData.append('image', file.name)
    const entries = [...formData.entries()];

    const product = entries.reduce((acc, entry) => {
      const [key, value] = entry;
      acc[key] = value;
      return acc;
    }, {});

    return onSave(product);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (() => resolve(reader.result));
      reader.onerror = ((error) => reject(error));
    });

  return (
    <form className="main" onSubmit={onSubmit}>
      <div className={'title'}>
        <h4>Add new product</h4>
      </div>
      <br />
      <div className="control">
        <input
          defaultValue='Name'
          name="name"
          id="name"
          className='inputBox'
          onChange={(ev) => setName(ev.target.value)}
        />
        <label className="errorLabel">{nameError}</label>
      </div>

      <div className="control">
        <input
          defaultValue='Price'
          name="price"
          id="price"
          className='inputBox'
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <label className="errorLabel">{priceError}</label>
      </div>

      <div className="control">
        <label htmlFor="active">Active</label>
        <input
          type='checkbox'
          name='checked'
          id='active'
        />
      </div>

      <div className='control'>
        <label htmlFor="fileInput">Image</label>
        <input
          id='fileInput'
          type='file'
          name='file'
          accept='.png,.jpeg,.jpg'
          onChange={(ev) => setFile(ev.target.files[0])}
        />
      </div>

      <div className="button">
        <button type="submit" disabled={disabled}>
          Send
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
