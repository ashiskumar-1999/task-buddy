import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import LogIn from '@/components/Login';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../config/firebase';
import { useRouter } from 'next/router';
import Createtask from '@/section/Createtask';

export default function Home() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const handleLogin = async () => {
    const auth = getAuth(firebaseConfig);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          console.log('Token:', token);
          if (token) {
            router.push('/dashboard');
          }
        }

        const user = result.user;
        //save the user's Name and photoURL in localstorage for future use
        if (user !== null) {
          const diaplayName = user.displayName || '';
          const displayPhoto = user.photoURL || '';
          localStorage.setItem('ProfileName', diaplayName);
          localStorage.setItem('Photo', displayPhoto);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <LogIn handleLogin={handleLogin} />
    </div>
  );
}
