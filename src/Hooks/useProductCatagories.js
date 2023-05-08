import { useEffect, useState } from "react";

const useProductCatagories = () => {
  const [catagories, setCatagories] = useState([]);
  useEffect(() => {
    fetch("productCatagories.json")
      .then((res) => res.json())
      .then((data) => setCatagories(data));
  }, [catagories.json]);
  //   console.log(products);
  return [catagories, setCatagories];
};

export default useProductCatagories;
