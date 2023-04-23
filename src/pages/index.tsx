import ItemCard from '@/components/ItemCard';
import ItineraryCard from '@/components/ItineraryCard';
import LoginButton from '@/components/LoginButton';
import Map from '@/components/Map';
import tiktoks from '@/lib/tiktoks.json';
import { GeoLocation, MapItemType, TiktokResponse } from '@/lib/types';
import { shuffle } from '@/lib/utils';
import Logo from '@/public/logo.png';
import styles from '@/styles/pages/Home.module.scss';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegCompass } from 'react-icons/fa';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import LoadingIcons from 'react-loading-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const fetchPopularTiktoksForTerm = (_: string, __: string) => {
  // axios.get('tiktok.com').then().catch();
  return tiktoks;
};

const PURPLE = '#c8a0d8';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [viewMode, setViewMode] = useState<'discover' | 'saved' | 'itinerary'>('discover');
  const [displaySearchResults, setDisplaySearchResults] = useState<MapItemType[]>([]);
  const [favorites, setFavorites] = useState<MapItemType[]>([]);
  const [itineraryResponse, setItineraryResponse] = useState();
  const [listSelection, setListSelection] = useState<{ [key: string]: boolean }>({});
  const [history, setHistory] = useState<MapItemType[]>([]);

  const [goTo, setGoTo] = useState<GeoLocation | null>(null);

  const fetchCohere = async (list: string[]) => {
    const prompt = `create an itinerary for my day in Los Angeles including all of the following locations in whichever order makes the most sense:
      ${list.map(
        item => `- ${item}
      `
      )}
    `;
    const res = await axios.post('/api/cohere', {
      prompt,
    });

    setItineraryResponse(res.data[0]);
  };

  const addToHistory = (item: MapItemType) => {
    setHistory(curr => [item, ...curr]);
  };

  // const [flyTo, setFlyTo] = useState(null);

  const generateDisplayResults = async (popularVideos: TiktokResponse[]) => {
    setDisplaySearchResults([]);
    for (const video of popularVideos) {
      try {
        const yelp = await axios.post('/api/yelp', {
          term: video.name,
          location: search2,
        });

        const data = JSON.parse(yelp.data);
        const returnObject: MapItemType = {
          image: data.image_url,
          name: data.name,
          impressions: video.impressions,
          id: data.id,
          isClosed: data.is_closed,
          yelpPage: data.url,
          tiktokVideo: video.video,
          coordinates: { ...data.coordinates },
          transactions: data.transactions,
          price: data.price,
          phone: data.phone,
          displayAddress: data.location.display_address,
          categories: data.categories.map((item: { alias: string; title: string }) => item.title),
          type: 'food',
        };
        setDisplaySearchResults(current => [...current, returnObject]);
        setLoading(false);
      } catch (err: any) {}
    }
  };

  useEffect(() => {
    if (!session?.user) router.push('/login');
  }, [session?.user]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchDiscover = async () => {
    if (!search1 || !search2) {
      toast('Please enter a search query to continue');
      return;
    }
    setLoading(true);

    const popularVideos: TiktokResponse[] = shuffle(
      fetchPopularTiktoksForTerm(search1, search2)
    ).slice(0, 5);

    await generateDisplayResults(popularVideos);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <section className={styles.sidebar}>
          <Image src={Logo} alt="Website Logo" width={48} height={64} />
          <h1 className={styles.sidebarTitle}>wanderlust</h1>
          <div className={styles.modes}>
            <button onClick={() => setViewMode('discover')} className={styles.mode}>
              <FaRegCompass size={24} color={viewMode === 'discover' ? PURPLE : 'black'} />
              <span
                style={{
                  color: viewMode === 'discover' ? PURPLE : 'black',
                  fontSize: '12px',
                }}
              >
                Discover
              </span>
            </button>
            <button onClick={() => setViewMode('saved')} className={styles.mode}>
              {viewMode === 'saved' ? (
                <AiFillHeart size={24} color={PURPLE} />
              ) : (
                <AiOutlineHeart size={24} color={'black'} />
              )}
              <span
                style={{
                  color: viewMode === 'saved' ? PURPLE : 'black',
                  fontSize: '12px',
                }}
              >
                Likes
              </span>
            </button>
            <button onClick={() => setViewMode('itinerary')} className={styles.mode}>
              <MdOutlineCalendarMonth
                size={24}
                color={viewMode === 'itinerary' ? PURPLE : 'black'}
              />
              <span
                style={{
                  color: viewMode === 'itinerary' ? PURPLE : 'black',
                  fontSize: '12px',
                }}
              >
                Itinerary
              </span>
            </button>
          </div>
          <hr className={styles.line} />
          <div className={styles.recents}>
            <h6>History</h6>
            <div className={styles.recentItems}>
              {history.slice(0, 3).map(item => (
                <button
                  onClick={() =>
                    setGoTo({ lat: item.coordinates.latitude, lng: item.coordinates.longitude })
                  }
                  key={item.id}
                  className={styles.recentItem}
                >
                  <img
                    src={item.image}
                    alt="Item Image"
                    width={24}
                    height={24}
                    className={styles.recentItemImage}
                  />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.logout}>
            <img src={'https://source.unsplash.com/random/?big+city/'} />
            <span>{session?.user?.name}</span>
            <LoginButton />
          </div>
        </section>
        <section className={styles.menu}>
          {viewMode === 'discover' ? (
            <div
              className={styles.discovery}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  searchDiscover();
                }
              }}
            >
              <h3 className={styles.discoveryHeader}>Discover Nearby</h3>
              <div className={styles.search}>
                <input
                  type="text"
                  placeholder="Quick meals..."
                  value={search1}
                  onChange={e => setSearch1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="West Hollywood, CA"
                  value={search2}
                  onChange={e => setSearch2(e.target.value)}
                />
                <button onClick={() => searchDiscover()}>Search</button>
              </div>
              {loading ? (
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <LoadingIcons.Puff stroke="#c8a0d8" strokeOpacity={0.75} />
                    <h1>Thank you for your patience!</h1>
                    <h1> ଘ(੭ˊᵕˋ)੭* ੈ✩‧˚</h1>
                  </div>
                </div>
              ) : (
                displaySearchResults.map(item => (
                  <ItemCard
                    handleMapPreview={() => {
                      setGoTo({
                        lat: item.coordinates.latitude,
                        lng: item.coordinates.longitude,
                      });
                      addToHistory(item);
                    }}
                    small={false}
                    key={item.id}
                    favorite={() => {
                      const index = favorites.findIndex(elem => elem.id === item.id);

                      if (index === -1) {
                        setFavorites(current => [item, ...current]);
                      } else {
                        setFavorites(current => {
                          const copy = [...current];
                          copy.splice(index, 1);
                          return copy;
                        });
                      }
                    }}
                    favorited={favorites.findIndex(elem => elem.id === item.id) !== -1}
                    {...item}
                  />
                ))
              )}
            </div>
          ) : null}
          {viewMode === 'saved' ? (
            <div className={styles.saved}>
              <h3 className={styles.savedHeader}>Saved Locations</h3>
              {favorites.map(item => (
                <ItemCard
                  handleMapPreview={() => {
                    setGoTo({
                      lat: item.coordinates.latitude,
                      lng: item.coordinates.longitude,
                    });
                    addToHistory(item);
                  }}
                  small={favorites.length !== 1}
                  key={item.id}
                  favorite={() => {
                    const index = favorites.findIndex(elem => elem.id === item.id);
                    if (index === -1) {
                      setFavorites(current => [...current, item]);
                    } else {
                      setFavorites(current => {
                        const copy = [...current];
                        copy.splice(index, 1);
                        return copy;
                      });
                    }
                  }}
                  favorited={favorites.findIndex(elem => elem.id === item.id) !== -1}
                  {...item}
                />
              ))}
            </div>
          ) : null}
          {viewMode === 'itinerary' ? (
            <div className={styles.itinerary}>
              <h3 className={styles.header}>Create an AI-powered itinerary.</h3>
              {favorites.map(item => (
                <ItineraryCard
                  favorite={() => {
                    const index = favorites.findIndex(elem => elem.id === item.id);

                    if (index === -1) {
                      setFavorites(current => [item, ...current]);
                    } else {
                      setFavorites(current => {
                        const copy = [...current];
                        copy.splice(index, 1);
                        return copy;
                      });
                    }
                  }}
                  favorited={favorites.findIndex(elem => elem.id === item.id) !== -1}
                  {...item}
                  {...item}
                />
              ))}
              {/* {favorites.map(item => (
                <div key={item.id}>
                  <input
                    type="checkbox"
                    name={item.id}
                    checked={listSelection[item.id] === true}
                    onChange={() => {
                      setListSelection(curr => {
                        const clone = { ...curr };
                        const state = clone[item.id];
                        clone[item.id] = !state;
                        return clone;
                      });
                    }}
                  />
                  <label id={item.id} htmlFor={item.id}>
                    {item.name}
                  </label>
                </div>
              ))} */}
              {/* <button
                onClick={() => {
                  const on = Object.entries(listSelection)
                    .filter(([_, v]) => v === true)
                    .map(([k, _]) => document.getElementById(k)?.innerText) as string[];
                  fetchCohere(on);
                }}
              >
                Generate
              </button>
              <p className={styles.itineraryResponse}>{itineraryResponse}</p> */}
            </div>
          ) : null}
        </section>
        <section className={styles.map}>
          <Map markers={displaySearchResults} goTo={goTo} />
        </section>
      </div>
    </>
  );
};

export default Home;
