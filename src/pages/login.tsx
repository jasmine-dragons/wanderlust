import LoginButton from '@/components/LoginButton';
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
    <div>
      <LoginButton />
    </div>
  );
};

export default LoginPage;
