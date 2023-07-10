import React from 'react';
import BreadCrumbs from '../../Shared/Components/BreadCrumbs';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
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
        <div>Please provide your card information and complete payment!</div>
        <div className='card card-compact w-96 bg-secondary  shadow-xl my-5'>
          <div className='card-body'>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
