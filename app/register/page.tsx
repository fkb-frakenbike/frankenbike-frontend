'use client';

import FormComponent from '../components/FormComponent';
import LoginCheck from '../services/loginCheck';

export default function Home() {
  return (
    <>
      <LoginCheck />
      <FormComponent />
    </>
  );
}
