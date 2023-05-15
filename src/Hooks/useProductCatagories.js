import { useEffect, useState } from "react";

const useProductCatagories = () => {
  const [catagories, setCatagories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCatagories(data));
  }, []);
  //   console.log(products);
  return [catagories, setCatagories];
};

export default useProductCatagories;
