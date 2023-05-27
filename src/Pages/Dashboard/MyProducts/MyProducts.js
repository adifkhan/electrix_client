import useUser from "../../../Hooks/useUser";
import RatingsReviews from "../../Products/Ratings/RatingsReviews";
import { logOut } from "../../../Shared/Components/utilities";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Components/Loading";

const MyProducts = () => {
  // const [myProducts, setMyProducts] = useState([]);
  const [userInfo] = useUser();
  const navigate = useNavigate();

  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myproducts", `${userInfo.userId}`],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/myproducts?sellerId=${userInfo.userId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.ok) {
        navigate("/login");
        return logOut();
      } else {
        return response.json();
      }
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  // remove product by seller //
  const handleRemoveProduct = (product) => {
    console.log(product);
  };
  refetch();
  return (
    <div className="grid grid-cols-1 min-[750px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-8 absolute top-0 p-5">
      {myProducts.map((product) => (
        <section
          key={product._id}
          className="card rounded max-w-[350px] card-compact bg-base-100 shadow-xl relative flex-row"
        >
          <figure>
            <img src={product.img} alt="products" />
          </figure>
          <div
            className="flex justify-center items-center w-12  h-12 text-white font-normal text-sm absolute top-0 left-0"
            style={{ background: `${product.customColor}` }}
          >
            <p>$ {product.price}</p>
          </div>
          <label
            onClick={() => handleRemoveProduct(product)}
            className="btn btn-xs btn-circle btn-secondary absolute top-2 right-2"
          >
            ✕
          </label>
          <div className="card-body">
            <h2 className="text-xs font-normal">{product.category}</h2>
            <h2 className="text-sm font-medium">{product.name}</h2>
            <p className="">{product.description}</p>
            <div className="">
              <RatingsReviews
                key={product._id}
                ratings={(
                  product.ratings.reduce((a, b) => a + b, 0) /
                  product.ratings.length
                ).toFixed(1)}
              />
              <small className="pl-2">({product.ratings.length} reviews)</small>
            </div>
            <div className=""></div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default MyProducts;
