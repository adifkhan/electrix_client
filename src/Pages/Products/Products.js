import useProducts from "../../Hooks/useProducts";
import ProductCard from "./ProductCart/ProductCart";
import { addToDb } from "../../Shared/Components/LocalStorage";
import useProductCatagories from "../../Hooks/useProductCatagories";
import useCart from "../../Hooks/useCart";

const Products = () => {
  const [products] = useProducts();
  const [categories] = useProductCatagories();
  const [cart, setCart] = useCart();

  // function for adding products to the cart starts here //
  const handleAddToCart = async (newProduct) => {
    const newCart = [...cart, newProduct];
    setCart(newCart);
    addToDb(newProduct._id);
  };
  // function for adding products to the cart ends here //

  return (
    <div className="bg-[#002632] mt-[-35px] px-5 py-14 min-[376px]:px-10 sm:px-14">
      <div className="flex">
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
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border my-2 hover:bg-slate-300"
                >
                  <ul className="list-disc ml-8">
                    <li className="m-2 cursor-pointer">{category.name}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <h1 className="text-xl font-bold text-center">
                Popular Products :
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <div>
            <div>
              <h1 className="mt-[-18] mb-8 text-primary text-center font-bold text-2xl lg:text-3xl ">
                Our Best Products
              </h1>
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
      </div>
      <div className="w-full h-[1px] bg-[gray] mt-12"></div>
    </div>
  );
};

export default Products;
