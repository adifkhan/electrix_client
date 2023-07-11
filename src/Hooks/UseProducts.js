import { useEffect, useState } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://electrix-server.vercel.app/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products.json]);
  //   console.log(products);
  return [products, setProducts];
};

export default useProducts;
