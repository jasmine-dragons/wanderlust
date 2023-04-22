import LoginButton from '@/components/LoginButton';
import MapComponent from '@/components/MapComponent';
import tiktoks from '@/lib/tiktoks.json';
import styles from '@/styles/pages/Home.module.scss';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegCompass } from 'react-icons/fa';
import { HiOutlineNewspaper } from 'react-icons/hi';

interface TiktokResponse {
  name: string;
  impressions: number;
  video: string;
}

const fetchPopularTiktoksForTerm = (search: string, location: string) => {
  // axios.get('tiktok.com').then().catch();
  return tiktoks;
};

interface MapItemType {
  image: string;
  name: string;
  isClosed: boolean;
  yelpPage: string;
  tiktokVideo: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  impressions: number;
  displayAddress: string[];
  transactions: string[];
  categories: string[];
  phone: string;
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [viewMode, setViewMode] = useState<'discover' | 'saved' | 'itinerary'>('discover');
  const [displaySearchResults, setDisplaySearchResults] = useState<MapItemType[]>([]);

  // const [flyTo, setFlyTo] = useState(null);

  const generateDisplayResults = async (popularVideos: TiktokResponse[]) => {
    setDisplaySearchResults([]);
    for (const video of popularVideos) {
      const yelp = await axios.post('/api/yelp', {
        term: video.name,
        location: search2,
      });
      const data = JSON.parse(yelp.data);
      const returnObject: MapItemType = {
        image: data.image_url,
        name: data.name,
        impressions: video.impressions,
        isClosed: data.is_closed,
        yelpPage: data.url,
        tiktokVideo: video.video,
        coordinates: { ...data.coordinates },
        transactions: data.transactions,
        phone: data.phone,
        displayAddress: data.location.display_address,
        categories: data.categories.map((item: { alias: string; title: string }) => item.title),
      };
      setDisplaySearchResults(current => [...current, returnObject]);
    }
  };

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
          <button onClick={() => setViewMode('discover')} className={styles.mode}>
            <FaRegCompass size={24} />
            <span>Discover</span>
          </button>
          <button onClick={() => setViewMode('saved')} className={styles.mode}>
            <AiOutlineHeart size={24} />
            <span>Saved</span>
          </button>
          <button onClick={() => setViewMode('itinerary')} className={styles.mode}>
            <HiOutlineNewspaper size={24} />
            <span>Itinerary</span>
          </button>
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
          </div>
        </div>
        <div className={styles.logout}>
          {session?.user?.image ? <img src={session?.user?.image} /> : null}
          <LoginButton />
        </div>
      </section>
      <section className={styles.menu}>
        {viewMode === 'discover' ? (
          <div className={styles.discovery}>
            <h5 className={styles.discoverySubtitle}>Welcome, {session?.user?.name}</h5>
            <h3 className={styles.discoveryHeader}>Discover Nearby</h3>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="date night restaurants.."
                value={search1}
                onChange={e => setSearch1(e.target.value)}
              />
              <input
                type="text"
                placeholder="West Hollywood, CA"
                value={search2}
                onChange={e => setSearch2(e.target.value)}
              />
              <button
                onClick={() => {
                  const popularVideos: TiktokResponse[] = fetchPopularTiktoksForTerm(
                    search1,
                    search2
                  ).slice(0, 5);
                  // TODO: Randomize results

                  generateDisplayResults(popularVideos);
                }}
              >
                Search
              </button>
            </div>
            {displaySearchResults.map(item => (
              <h1>{item.name}</h1>
            ))}
          </div>
        ) : null}
        {viewMode === 'saved' ? (
          <>
            <h1>saved</h1>
          </>
        ) : null}
        {viewMode === 'itinerary' ? (
          <>
            <h1>itinerary</h1>
          </>
        ) : null}
      </section>
      <section className={styles.map}>
        <MapComponent />
      </section>
    </div>
  );
};

export default Home;
