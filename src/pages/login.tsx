import LoginButton from '@/components/LoginButton';
import Balloon1 from '@/public/balloon1.png';
import Balloon2 from '@/public/balloon2.png';
import styles from '@/styles/pages/Login.module.scss';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Typist from 'react-text-typist';

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, [session?.user, router]);

  return (
    <div className={styles.container}>
      <img src={Balloon1.src} className={styles.balloon1} alt="balloon" />
      <img src={Balloon2.src} className={styles.balloon2} alt="balloon" />
      <div className={styles.content}>
        <h1 className={styles.header}>
          <Typist
            sentences={['wanderlust']}
            loop={false}
            typingSpeed={120}
            startDelay={750}
            cursorSmooth
          />
        </h1>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
