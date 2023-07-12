import { getToken, logOut } from '../Shared/Components/utilities';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useCart = () => {
  const [userInfo] = useUser();
  const token = getToken();
  const navigate = useNavigate();
  const email = userInfo?.email;

  const {
    data: cart = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['mycart', email],
    queryFn: async () => {
      const response = await fetch(
        `https://electrix-server.vercel.app/mycart?email=${userInfo?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        navigate('/login');
        return logOut();
      } else {
        return response.json();
      }
    },
    enabled: !!email,
  });

  return [cart, isLoading, refetch];
};

export default useCart;
