'use client';

import './components/TextLoader/TextLoader.css';
import TextLoader from './components/TextLoader/TextLoader';
import LoginCheck from './services/LoginCheck';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginCheck />
      <TextLoader text="FKB" className="fade font-main text-6xl" />
    </div>
  );
}
