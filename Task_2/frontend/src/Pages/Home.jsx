import React, { useEffect, useState } from 'react';
import Loading from "../Components/Loading/Loading";
import ProductList from '../Components/ProductList/ProductList';

const fetchProducts = () => {
  return fetch("/api/products").then((res) => res.json());
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setLoading(false);
        setProducts(products);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <ProductList products={products} />
    </div>
  )
}

export default Home;