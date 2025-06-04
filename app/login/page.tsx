'use client';

import LoginFormComponent from '../components/LoginFormComponent';
import LoginCheck from '../services/loginCheck';

export default function Home() {
  return (
    <>
      <LoginCheck />
      <LoginFormComponent />
    </>
  );
}
