import React from 'react';
import useCart from '../../Hooks/useCart';
// import { FaCaretUp, FaCaretDown, FaRegTrashAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import BreadCrumbs from '../../Shared/Components/BreadCrumbs';
import useUser from '../../Hooks/useUser';
import { useNavigate } from 'react-router-dom';
// import Loading from '../../Shared/Components/Loading';

const CheckOut = () => {
  const navigate = useNavigate();
  const [cart] = useCart();
  const [userInfo] = useUser();
  const { register, handleSubmit } = useForm();

  // if (isLoading) {
  //   return <Loading />;
  // }
  //Calculation of the total amount to pay for user orders  starts here //
  let subTotal = 0;
  let shippingCost = 0;
  cart?.forEach((item) => {
    const total = item.quantity * item.price;
    const shipping = item.shipping * 1;
    subTotal = subTotal + total;
    shippingCost = shippingCost + shipping;
  });
  const tax = parseFloat(((subTotal / 100) * 15).toFixed(2));
  const grandTotal = subTotal + shippingCost + tax;
  //Calculation of the total amount to pay for user orders  ends here //

  const onSubmit = () => {
    navigate('/payment');
  };
  return (
    <div>
      <BreadCrumbs
        breadcrumb={{
          page: 'Check-Out',
          bread: [
            { name: 'Home', address: '/' },
            { name: 'Products', address: '/products' },
          ],
        }}
      ></BreadCrumbs>
      <section className='flex flex-col md:flex-row justify-around w-full p-5'>
        <section className='grid grid-cols-1 w-full'>
          <h2 className='text-center font-semibold text-xl my-3'>
            Your Orders
          </h2>
          {cart?.map((item) => (
            <div
              key={item._id}
              className='flex flex-col sm:flex-row justify-center items-center bg-white border-2  w-full max-w-sm my-2 mx-auto relative'
            >
              <img className='w-20 mr-10' src={item.img} alt='' />
              <div>
                <p className='font-semibold'>{item.name}</p>
                <div className='text-sm'>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Price: ${item.price * item.quantity} /${item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className='mx-auto w-[70%]'>
            <h2 className='font-medium text-xl my-3'>Amount To Pay</h2>
            <div className='border-2 w-full my-3 p-3'>
              <p className='font-normal mb-1'>
                Cart Subtotal:
                <span className='text-secondary font-medium'>${subTotal}</span>
              </p>
              <p className='font-normal mb-1'>
                Shipping Cost:
                <span className='text-secondary font-medium'>
                  ${shippingCost}
                </span>
              </p>
              <p className='font-normal  mb-1'>
                VAT & SD:
                <span className='text-secondary font-medium'>${tax}</span>
              </p>
              <p className='font-semibold'>
                Grand Total:
                <span className='text-secondary'>${grandTotal}</span>
              </p>
            </div>
          </div>
        </section>
        <section className='w-full flex flex-col'>
          <div className='mx-auto my-5'>
            <h2 className='text-lg font-medium'>Discount Code</h2>
            <input
              className='bg-white border-2 border-gray-400 h-10 w-48 my-3 mr-4'
              type='text'
            />
            <input
              className='btn btn-secondary'
              type='submit'
              value='Apply Coupon'
            />
          </div>
          <section>
            <h3 className='text-center font-semibold text-xl my-3'>
              Please fill up the Form
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full flex flex-col items-center'
            >
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  placeholder={userInfo.displayName}
                  className='input input-bordered w-full max-w-xs'
                  {...register('name')}
                />
              </div>

              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  placeholder={userInfo.email}
                  className='input input-bordered w-full max-w-xs'
                  {...register('email')}
                />
              </div>
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Address</span>
                </label>
                <input
                  type='text'
                  placeholder={userInfo.address}
                  className='input input-bordered w-full max-w-xs'
                  {...register('address')}
                />
              </div>
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Phone No</span>
                </label>
                <input
                  type='number'
                  placeholder={userInfo.phone}
                  className='input input-bordered w-full max-w-xs'
                  {...register('phone')}
                />
              </div>

              <input
                className='btn btn-secondary text-white w-full mt-2 max-w-xs'
                type='submit'
                value='proceed'
              />
            </form>
          </section>
        </section>
      </section>
    </div>
  );
};

export default CheckOut;
