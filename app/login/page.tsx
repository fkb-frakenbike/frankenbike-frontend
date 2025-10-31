'use client';

import LoginForm from '../components/LoginForm';
import LoginCheck from '../services/LoginCheck';

export default function Home() {
  return (
    <>
      <LoginCheck />
      <LoginForm />
    </>
  );
}
