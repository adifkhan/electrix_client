import React from 'react';
import BreadCrumbs from '../../Shared/Components/BreadCrumbs';
import notFound from '../../images/not-found.jpg';

const NotFound = () => {
  return (
    <div>
      <div>
        <img className='mx-auto w-[70%] md:w-[50%]' src={notFound} alt='' />
      </div>
    </div>
  );
};

export default NotFound;
