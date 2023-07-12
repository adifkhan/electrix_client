import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../Shared/Components/utilities';
import Loading from '../../../Shared/Components/Loading';
import useUser from '../../../Hooks/useUser';

const MyOrders = () => {
  const [userInfo] = useUser();
  const navigate = useNavigate();

  const { data: myOrders = [], isLoading } = useQuery({
    queryKey: ['myorders', `${userInfo.email}`],
    queryFn: async () => {
      const response = await fetch(
        `https://electrix-server.vercel.app/myorders?email=${userInfo.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
  });
  if (isLoading) {
    return <Loading />;
  }
  const products = [];
  myOrders.map((orders) =>
    orders.products.map((item) => {
      return products.push(item);
    })
  );
  return (
    <div className='flex flex-col items-center absolute top-0 p-5'>
      <p className='text-xl font-semibold text-secondary mb-5'>
        Total Orders: {products.length}
      </p>
      <div className='grid grid-cols-1 min-[750px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-8'>
        {products.map((product) => (
          <section
            key={product._id}
            className='card rounded max-w-[350px] card-compact bg-base-100 shadow-xl relative flex-row'
          >
            <figure>
              <img className='w-24' src={product.img} alt='products' />
            </figure>
            <div className='card-body'>
              <h2 className='text-sm font-medium'>{product.name}</h2>
              <p className='text-secondary'>Quantity: {product.quantity}</p>
              <p className='text-secondary'>
                Total: ${product.price * product.quantity}
              </p>

              <div className=''></div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
