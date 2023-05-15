import useProducts from "../../Hooks/useProducts";
import ProductCard from "./ProductCart/ProductCart";
import { addToDb } from "../../Shared/Components/LocalStorage";
import useProductCatagories from "../../Hooks/useProductCatagories";
import useCart from "../../Hooks/useCart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../Shared/Components/Button";

const Products = () => {
  const [products] = useProducts();
  const [categories] = useProductCatagories();
  const [cart, setCart] = useCart();

  // function for adding products to the cart starts here //
  const handleAddToCart = (newProduct) => {
    const inCart = cart.find((item) => item._id === newProduct._id);
    if (!inCart) {
      const newCart = [...cart, newProduct];
      setCart(newCart);
      addToDb(newProduct._id);
      toast(newProduct.name, "is added in Your Cart !");
    } else {
      toast.error("This Product is Already in Your Cart !");
    }
  };
  // function for adding products to the cart ends here //

  return (
    <div className="bg-[#002632]">
      <div className="breadCrumbs text-accent flex flex-col items-center pt-16 pb-10 mt-[-30px]">
        <p className="text-3xl font-semibold uppercase">Products</p>
        <div className="text-sm font-medium  breadcrumbs">
          <ul>
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Products</Link>
            </li>
            <li>Category</li>
          </ul>
        </div>
      </div>
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
            <ul>
              <li className="flex items-center my-2 border-2 p-2 cursor-pointer">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-secondary radio-sm"
                />
                <span className="text-sm font-medium ml-3">All Category</span>
              </li>
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="flex items-center my-2 border-2 p-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="radio-2"
                    className="radio radio-secondary radio-sm"
                  />
                  <span className="text-sm font-medium ml-3">
                    {category.name}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <h1 className="text-xl font-bold text-center">
                Popular Products :
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto px-2">
          <div className="flex flex-col lg:flex-row justify-between items-center my-8">
            <h1 className="mt-[-18] mb-8 text-primary text-center font-bold text-2xl lg:text-3xl ">
              Our Best Products
            </h1>
            <Link to="/addproduct">
              <Button>+ Add New Product</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
