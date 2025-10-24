'use client';

import LoginCheck from './services/LoginCheck';
import TextLoader from './components/TextLoader/TextLoader';
import '../app/components/TextLoader/TextLoader.css';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginCheck />
      <TextLoader text="FKB" className="fade font-main text-6xl" />
    </div>
  );
}
