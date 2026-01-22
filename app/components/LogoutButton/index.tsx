'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import useLogout from './LogoutHandler';

type LogoutButtonProps = {
  onLogout: () => void;      // ✅ Remplace setUser
  setError: (msg: string | null) => void;  // ✅ null aussi
};

const violetColor = '#2c0857';

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, setError }) => {
  // ✅ Passe onLogout + setError au hook
  const { handleLogout, loggingOut } = useLogout(onLogout, setError);
  const pathname = usePathname();

  const isFeedPage = pathname === '/feed';

  const buttonClass = isFeedPage
    ? "rounded px-4 py-2 text-white disabled:opacity-50"
    : "rounded bg-white px-4 py-2 disabled:opacity-50 border border-gray-300";

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
