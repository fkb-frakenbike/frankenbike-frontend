'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import useLogout from './LogoutHandler';

type LogoutButtonProps = {
  setUser: (user: null) => void;
  setError: (msg: string) => void;
};

const violetColor = '#2c0857';

const LogoutButton: React.FC<LogoutButtonProps> = ({ setUser, setError }) => {
  const { handleLogout, loggingOut } = useLogout(setUser, setError);
  const pathname = usePathname();

  const isFeedPage = pathname === '/feed'; // adaptez si besoin

  const buttonClass = isFeedPage
    ? "rounded px-4 py-2 text-white disabled:opacity-50"
    : "rounded bg-white px-4 py-2 disabled:opacity-50";

  const style = isFeedPage
    ? { backgroundColor: violetColor }
    : { color: violetColor, backgroundColor: 'white' };

  return (
    <button
      onClick={handleLogout}
      disabled={loggingOut}
      className={buttonClass}
      style={style}
    >
      {loggingOut ? 'Logging out…' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
