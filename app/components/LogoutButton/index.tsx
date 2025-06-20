import React from 'react';
import useLogout from './LogoutHandler';

type LogoutButtonProps = {
  setUser: (user: null) => void;
  setError: (msg: string) => void;
};

const LogoutButton: React.FC<LogoutButtonProps> = ({ setUser, setError }) => {
  const { handleLogout, loggingOut } = useLogout(setUser, setError);
  return (
    <button
      onClick={handleLogout}
      disabled={loggingOut}
      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
    >
      {loggingOut ? 'Logging out…' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
