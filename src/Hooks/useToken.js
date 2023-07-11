import { useEffect, useState } from 'react';

const useToken = (user, userRole) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const displayName = user?.user?.displayName;
    const email = user?.user?.email;
    const currentUser = {
      email: email,
      displayName: displayName,
      role: userRole,
    };

    if (email) {
      fetch(`https://electrix-server.vercel.app/user/${email}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);
        });
    }
  }, [user, userRole]);

  return [token];
};

export default useToken;
