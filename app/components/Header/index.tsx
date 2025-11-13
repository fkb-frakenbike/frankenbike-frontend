'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '../LogoutButton';
import api from '../../lib/axios';
import { User } from '@/app/types/user';
import { BiMenu, BiX } from 'react-icons/bi';

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isWhite = pathname !== '/feed';

  // Gestion visibilité header au scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const controlHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', controlHeaderVisibility);
    return () => window.removeEventListener('scroll', controlHeaderVisibility);
  }, []);

  // Récupération user au montage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/me');
        setUser(res.data.user || null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const navLinks = [
  { href: '/feed', label: 'Feed' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/add-project', label: 'Créer un Projet' },
  { href: '/add-component', label: 'Ajouter un Composant' },
  { href: '/mentions-legales', label: 'Mentions légales' },
];


  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent py-2">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className={`flex h-28 justify-between ${!isMobileMenuOpen && 'w-full'}`}>
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/feed">
              <h1 className={`font-main text-3xl ${isWhite ? 'text-white' : 'text-[#2d005e]'}`}>FKB</h1>
            </Link>
          </div>

          {/* Liens navigation desktop */}
          {!['/login', '/register'].includes(pathname) && (
            <div
              className={`h-full ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
              } hidden items-center space-x-8 transition-transform duration-300 ease-in-out lg:flex`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-lg transition-colors ${
                    isWhite ? 'text-white' : 'text-[#2d005e]'
                  } ${pathname === link.href ? 'font-bold' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
              {user && <span className={isWhite ? 'text-white' : 'text-[#2d005e]'}>{user.email}</span>}
              {user && <LogoutButton setUser={setUser} setError={setError} />}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center justify-end lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`inline-flex items-center justify-center rounded-md p-2 focus:outline-none ${
              isWhite ? 'text-white hover:bg-gray-200' : 'text-[#2d005e] hover:bg-gray-100'
            }`}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMobileMenuOpen ? <BiX className="h-6 w-6" /> : <BiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile coulissant */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-3/4 overflow-auto shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isWhite ? 'bg-[#2d005e]' : 'bg-white'}`}
      >
        <div className="flex justify-end border-b border-gray-200 p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`inline-flex items-center justify-center rounded-md p-2 focus:outline-none ${
              isWhite ? 'text-white hover:bg-gray-300' : 'text-[#2d005e] hover:bg-gray-100'
            }`}
            aria-label="Fermer le menu"
          >
            <BiX className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                isWhite ? 'text-white hover:bg-gray-500' : 'text-[#2d005e] hover:bg-gray-700'
              } ${pathname === link.href ? 'font-bold' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <div className="mt-4 border-t border-gray-300 pt-4">
              <span className={`${isWhite ? 'text-white' : 'text-[#2d005e]'} block mb-2`}>
                {user.email}
              </span>
              <LogoutButton setUser={setUser} setError={setError} />
            </div>
          )}
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}
    </nav>
  );
};

export default Header;
