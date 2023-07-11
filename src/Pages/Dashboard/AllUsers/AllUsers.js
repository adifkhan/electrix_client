import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Components/Loading';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../Shared/Components/utilities';

const AllUsers = () => {
  const navigate = useNavigate();

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allusers'],
    queryFn: async () => {
      const response = await fetch(
        'https://electrix-server.vercel.app/allusers',
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
  refetch();
  return (
    <div className='mx-5 text-sm absolute top-5 left-2'>
      <div className='overflow-x-scroll'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>UserId</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{user.displayName}</th>
                <th>{user.email}</th>
                <th>{user.userId}</th>
                <th>{user.role}</th>
                <th>{user.phone}</th>
                <th>
                  <div className='btn btn-circle btn-xs btn-secondary text-white'>
                    <FaRegTrashAlt />
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
