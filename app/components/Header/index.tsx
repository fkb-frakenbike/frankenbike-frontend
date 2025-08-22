'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '../LogoutButton';
import api from '@/app/lib/axios';
import { User } from '@/app/types/user';
import { BiMenu, BiX } from 'react-icons/bi';

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', controlHeaderVisibility);
    return () => {
      window.removeEventListener('scroll', controlHeaderVisibility);
    };
  }, []);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/settings', label: 'Settings' },
    { href: '/help', label: 'Help' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/me');
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav
      className={`${isVisible ? 'translate-y-0' : '-translate-y-full'} fkb-bg fixed z-50 w-full py-8 transition-transform duration-300 ease-in-out`}
    >
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className={`flex h-16 justify-between ${!isMobileMenuOpen && 'w-full'}`}>
          {/* Logo*/}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="font-main text-3xl text-white">FKB</h1>
            </Link>
          </div>
          {/* Navigation links */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-lg text-white transition-colors hover:text-gray-50 ${pathname === link.href ? 'font-bold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {user && <span className="hidden text-white sm:block">{user.email}</span>}
            {user && <LogoutButton setUser={setUser} setError={setError} />}
          </div>
        </div>
        {/* Mobile menu */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-100 hover:text-gray-50 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <BiX className="h-6 w-6 text-white" />
            ) : (
              <BiMenu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 ${pathname === link.href ? 'font-bold' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {error && <div className="text-red-600">{error}</div>}
    </nav>
  );
};

export default Header;
