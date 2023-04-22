import LoginButton from '@/components/LoginButton';
import styles from '@/styles/pages/Login.module.scss';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, [session?.user]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.header}>wanderlust.</h1>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
