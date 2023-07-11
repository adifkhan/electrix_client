import React from 'react';
import BreadCrumbs from '../../Shared/Components/BreadCrumbs';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../Hooks/useCart';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const [cart] = useCart();

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

  return (
    <div>
      <BreadCrumbs
        breadcrumb={{
          page: 'Payment',
          bread: [
            { name: 'Products', address: '/products' },
            { name: 'Check-Out', address: '/checkout' },
          ],
        }}
      ></BreadCrumbs>
      <div className='flex flex-col items-center my-6'>
        <div>
          <h3 className='text-secondary font-bold text-2xl text-center'>
            Payment Amount: ${grandTotal}{' '}
            <small className='font-normal text-sm'>(VAT included)</small>
          </h3>
          <p className='text-secondary font-medium text-xl text-center'>
            Please provide your card information and complete payment!
          </p>
          <p className='text-red-500 text-center text-sm mt-2'>
            *Only Stripe Test Cards can be used!
          </p>
        </div>
        <div className='card card-compact w-96 bg-secondary  shadow-xl my-2'>
          <div className='card-body'>
            <Elements stripe={stripePromise}>
              <CheckoutForm price={grandTotal} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
