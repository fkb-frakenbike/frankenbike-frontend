'use client';

export default function Header() {
  return (
    <header
      className="fixed left-0 top-0 z-50 w-full bg-transparent py-8"
      style={{ pointerEvents: 'none' }}
    >
      <h1 className="font-main text-center text-3xl text-white">FKB</h1>
    </header>
  );
}
