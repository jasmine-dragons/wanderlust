import LoginButton from '@/components/LoginButton';
import MapComponent from '@/components/MapComponent';
import styles from '@/styles/pages/Home.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegCompass } from 'react-icons/fa';
import { HiOutlineNewspaper } from 'react-icons/hi';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session?.user]);

  return (
    <div className={styles.container}>
      <section className={styles.sidebar}>
        <h6 className={styles.sidebarTitle}>wanderlust.</h6>
        <div className={styles.modes}>
          <div className={styles.mode}>
            <FaRegCompass size={24} />
            <span>Discover</span>
          </div>
          <div className={styles.mode}>
            <AiOutlineHeart size={24} />
            <span>Saved</span>
          </div>
          <div className={styles.mode}>
            <HiOutlineNewspaper size={24} />
            <span>Itinerary</span>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.recents}>
          <h6>History</h6>
          <div className={styles.recentItems}>
            <button className={styles.recentItem}>
              <Image
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                alt="Item Image"
                width={64}
                height={64}
                className={styles.recentItemImage}
              />
              <span>Marty's Pizza Parlor</span>
            </button>
            <button className={styles.recentItem}>
              <Image
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                alt="Item Image"
                width={64}
                height={64}
                className={styles.recentItemImage}
              />
              <span>Marty's Pizza Parlor</span>
            </button>
            <button className={styles.recentItem}>
              <Image
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                alt="Item Image"
                width={64}
                height={64}
                className={styles.recentItemImage}
              />
              <span>Marty's Pizza Parlor</span>
            </button>
            <button className={styles.recentItem}>
              <Image
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                alt="Item Image"
                width={64}
                height={64}
                className={styles.recentItemImage}
              />
              <span>Marty's Pizza Parlor</span>
            </button>
            <button className={styles.recentItem}>
              <Image
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                alt="Item Image"
                width={64}
                height={64}
                className={styles.recentItemImage}
              />
              <span>Marty's Pizza Parlor</span>
            </button>
          </div>
        </div>
        <LoginButton />
      </section>
      <section className={styles.menu}>b</section>
      <section className={styles.map}>
        <MapComponent />
      </section>
      {/* <LoginButton />
      <h1>Hello, {session?.user?.name}</h1>
      <MapComponent /> */}
    </div>
  );
};

export default Home;
