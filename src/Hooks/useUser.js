import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.init";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Shared/Components/utilities";

const useUser = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    data: userInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/user?email=${user?.email}`,
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

  return [userInfo, isLoading, refetch];
};

export default useUser;
