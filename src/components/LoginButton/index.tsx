import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './style.module.scss';

const LoginButton = () => {
  const { data: session } = useSession();

  return session?.user ? (
    <button
      type="button"
      className={styles.logout}
      onClick={() => {
        signOut();
      }}
    >
      Log Out
    </button>
  ) : (
    <button
      type="button"
      className={styles.login}
      onClick={() => {
        signIn();
      }}
    >
      Sign In
    </button>
  );
};

export default LoginButton;
