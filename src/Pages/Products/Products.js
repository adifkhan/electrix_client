import ProductCard from "./ProductCart/ProductCart";
import useProductCatagories from "../../Hooks/useProductCatagories";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Shared/Components/Button";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";
import useUser from "../../Hooks/useUser";
import Loading from "../../Shared/Components/Loading";
import { toast } from "react-toastify";
import BreadCrumbs from "../../Shared/Components/BreadCrumbs";
import useCart from "../../Hooks/useCart";

const Products = () => {
  const [categories] = useProductCatagories();
  const [selectedCategory, setSelectedCategory] = useState("ALL-CATEGORY");
  const [products, setProducts] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [userInfo] = useUser();
  const [refetch] = useCart();
  const navigate = useNavigate();

  // load product according to the selected category //
  const handleProductLoading = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/products?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedCategory]);

  // function for adding products to the cart starts here //
  const handleAddToCart = (newProduct) => {
    if (user) {
      const cartProduct = {
        email: user.email,
        productId: newProduct._id,
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price,
        img: newProduct.img,
        seller: newProduct.seller,
        sellerId: newProduct.sellerId,
        shipping: newProduct.shipping,
        quantity: 1,
      };
      fetch(`http://localhost:5000/addtocart?email=${user.email}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(cartProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged === true) {
            toast.success(`${newProduct.name} is added to cart!`);
            refetch();
          }
        });
    } else {
      navigate("/login");
    }

    /* const inCart = cart.find((item) => item._id === newProduct._id);
    if (!inCart) {
      const newCart = [...cart, newProduct];
      setCart(newCart);
      addToDb(newProduct._id);
      toast(newProduct.name, "is added in Your Cart !");
    } else {
      toast.error("This Product is Already in Your Cart !");
    } */
  };
  // function for adding products to the cart ends here //
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-[#002632]">
      <BreadCrumbs
        breadcrumb={{
          page: "Products",
          bread: [{ name: "Home", address: "/" }],
        }}
      ></BreadCrumbs>
      <div className="flex px-5 min-[376px]:px-10 sm:px-10 md:pr-1">
        <div className="w-[350px]  pr-5 hidden sm:block">
          <div className="form-control my-8">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered flex-grow"
              />
              <button className="btn btn-neutral btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl font-bold text-center">
              Products Categories :
            </h2>
            <div>
              <label className="flex items-center my-2 border-2 p-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  className="radio radio-secondary radio-sm"
                  onChange={() => handleProductLoading("ALL-CATEGORY")}
                />
                <span className="text-sm font-medium ml-3">All Category</span>
              </label>
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center my-2 border-2 p-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    className="radio radio-secondary radio-sm"
                    onChange={() => handleProductLoading(category.name)}
                  />
                  <span className="text-sm font-medium ml-3">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-5">
              <h1 className="text-xl font-bold text-center">
                Popular Products :
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto px-3 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center my-8 px-8 w-full">
            <h1 className="mt-[-18] mb-8 text-primary text-center font-bold text-2xl lg:text-3xl ">
              Our Best Products
            </h1>
            {userInfo.role === "seller" && (
              <Link to="/addproduct">
                <Button>+ Add Product</Button>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 min-[890px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              ></ProductCard>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[gray] mt-12"></div>
    </div>
  );
};

export default Products;
