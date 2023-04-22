import { signIn, signOut, useSession } from 'next-auth/react';

const LoginButton = () => {
  const { data: session } = useSession();

  return session?.user ? (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Log Out
    </button>
  ) : (
    <button
      onClick={() => {
        signIn();
      }}
    >
      Sign In
    </button>
  );
};

export default LoginButton;
