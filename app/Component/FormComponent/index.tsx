"use client"

import Form from 'next/form'
import { useState } from 'react';

interface SignUpFormState  {
    firstname: string;
    lastname: string;
    email: string;
    password: string
  }

export default function FormComponent() {
    const [formData, setFormData] = useState<SignUpFormState> ({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })
    
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
    }
      
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2D005E] via-[#2D005E] to-[rgba(49,0,102,0.7)]" 
         style={{ backgroundSize: '100% 100%', backgroundPosition: '0 0, 0 26%, 0 67%, 0 98%' }}>
      <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign up</h1>
        <Form action="/search" className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Prénom</label>
            <input 
              type="text" 
              id="firstname" 
              name="firstname" 
              value={formData.firstname} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              S’inscrire
            </button>
          </div>
          
          <div className="text-sm text-center text-gray-600">
            Vous avez déjà un compte? 
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              Se connecter
            </a>
          </div>
        </Form>
      </div>
    </div>
  )
}