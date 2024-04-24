import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Loading from '../Components/Loading/Loading';

const fetchProducts = () => {
  return fetch("/api/products").then((res) => res.json());
};

const options = {

  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      },
      scaleLabel: {
        display: false,
        labelString: 'Price'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Product'
      }
    }]
  }
};

const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [names, setNames] = useState(null);
  const [prices, setPrices] = useState(null);

  function getDataFromProducts(products) {
    setNames(products.map((product) => product.product_name));
    setPrices(products.map((product) => product.price));
  }

useEffect(() => {
    fetchProducts()
      .then((products) => {
        setLoading(false);
        setProducts(products);
        const sortedProductsByNameDesc = products.sort((a,b) => 
          b.product_name.localeCompare(a.product_name)
        );
        getDataFromProducts(sortedProductsByNameDesc);
      })
  }, []);

  const data = {

    labels: names,
    datasets: [{
      label: 'Price',
      data: prices,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      barThickness: 'flex',
      borderWidth: 1
    }]
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="chart-container">
      <h1>Statisztika</h1>

      <Bar data={data}

        options={options}
      />



    </div >
  );
};

export default Stats;