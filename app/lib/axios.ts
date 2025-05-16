import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Utilise la variable d'environnement
  withCredentials: true, // <-- Ajoute cette option pour envoyer les cookies
});

export default api;
