'use client';

import LoginForm from '../components/LoginForm';
import LoginCheck from '../services/loginCheck';

export default function Home() {
  return (
    <>
      <LoginCheck />
      <LoginForm />
    </>
  );
}
