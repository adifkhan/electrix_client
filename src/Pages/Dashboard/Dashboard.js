import React from 'react';
import BreadCrumbs from '../../Shared/Components/BreadCrumbs';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <BreadCrumbs
        breadcrumb={{
          page: 'Dashboard',
          bread: [
            { name: 'Home', address: '/' },
            { name: 'Profile', address: '/profile' },
          ],
        }}
      ></BreadCrumbs>
      <section>
        <label
          className='btn btn-secondary swap swap-rotate w-10 lg:hidden m-2'
          htmlFor='dashboard-drawer'
        >
          <input type='checkbox' />
          <svg
            className='swap-off fill-white'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
          </svg>
        </label>
        <div className='drawer drawer-mobile bg-white'>
          <input
            id='dashboard-drawer'
            type='checkbox'
            className='drawer-toggle'
          />
          <div className='drawer-content flex flex-col items-center justify-center relative'>
            {/* <!-- Page content here --> */}
            <Outlet></Outlet>
          </div>
          <div className='drawer-side border-r-2 border-accent'>
            <label
              htmlFor='dashboard-drawer'
              className='drawer-overlay'
            ></label>
            <ul className='menu p-4 w-80 bg-secondary text-white'>
              {/* <!-- Sidebar content here --> */}
              <li>
                <Link to='/dashboard'>My Products</Link>
              </li>
              <li>
                <Link to='/dashboard/allusers'>All Users</Link>
              </li>
              <li>
                <Link to='/dashboard/myorders'>My Orders</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
