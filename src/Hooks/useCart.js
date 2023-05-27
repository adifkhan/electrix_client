import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.init";
import { getToken, logOut } from "../Shared/Components/utilities";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const [user] = useAuthState(auth);
  const token = getToken();
  const navigate = useNavigate();

  const {
    data: cart = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mycart", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/mycart?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
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

  return [cart, isLoading, refetch];
};

export default useCart;
