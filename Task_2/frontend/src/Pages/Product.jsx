import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../Components/ProductForm/ProductForm";

const createProduct = (product, token) => {
  return fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
};

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { token } = location.state;

  const handleCreateProduct = (product) => {
    setLoading(true);

    createProduct(product, token)
      .then(() => {
        setLoading(false);
        navigate("/index");
      });
  };

  return (
    <ProductForm
      user={location.state.user}
      onCancel={() => navigate("/index")}
      disabled={loading}
      onSave={handleCreateProduct}
    />
  );
};

export default Product;
