import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/mystyles.css'
import { useEffect } from 'react';


export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Check if sessions key exists in localStorage
    const sessions = localStorage.getItem('sessions');
    if (sessions === null) {
      // Initialize sessions key as empty array
      localStorage.setItem('sessions', JSON.stringify({}));
    }

    // Check if profile key exists in localStorage
    const profile = localStorage.getItem('profile');
    if (profile === null) {
      // Initialize profile key as empty array
      localStorage.setItem('profile', JSON.stringify([]));
    }
  }, []);

  return <Component {...pageProps} />
}
