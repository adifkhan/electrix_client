import { useEffect, useState } from 'react';

const useProductCatagories = () => {
  const [catagories, setCatagories] = useState([]);
  useEffect(() => {
    fetch('https://electrix-server.vercel.app/categories')
      .then((res) => res.json())
      .then((data) => setCatagories(data));
  }, []);
  //   console.log(products);
  return [catagories, setCatagories];
};

export default useProductCatagories;
