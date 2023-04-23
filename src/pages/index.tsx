/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ItemCard from '@/components/ItemCard';
import ItineraryCard from '@/components/ItineraryCard';
import LoginButton from '@/components/LoginButton';
import MapComponent from '@/components/Map';
import tiktoks from '@/lib/tiktoks.json';
import { GeoLocation, MapItemType, TiktokResponse } from '@/lib/types';
import { showToast, shuffle } from '@/lib/utils';
import Logo from '@/public/logo.png';
import Post from '@/public/post.png';
import styles from '@/styles/pages/Home.module.scss';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { FaRegCompass } from 'react-icons/fa';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import LoadingIcons from 'react-loading-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SlTrash } from 'react-icons/sl';

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
  const [itineraryResponse, setItineraryResponse] = useState<string>();
  const [history, setHistory] = useState<MapItemType[]>([]);
  const [goTo, setGoTo] = useState<GeoLocation | null>(null);
  const [finalItinerary, setFinalItinerary] = useState<MapItemType[]>([]);
  const [itineraryPrompt, setItineraryPrompt] = useState<MapItemType[]>([]);
  const [itineraryLoad, setItineraryLoad] = useState<boolean>(false);

  useEffect(() => {
    setItineraryPrompt(favorites);
  }, [favorites]);

  const fetchCohere = async (list: string[]) => {
    const prompt = `create an itinerary for my day in Los Angeles including all of the following locations in whichever order makes the most sense:
      ${list.map(
        item => `\n - ${item}
      `
      )}
    `;
    const res = await axios.post('/api/cohere', {
      prompt,
    });

    setItineraryResponse(res.data[0]);
  };

  const addToHistory = (item: MapItemType) => {
    const index = history.findIndex(e => e.id === item.id);
    if (index !== -1) {
      setHistory(history => {
        const clone = [...history];
        clone.splice(index, 1);

        return [item, ...clone];
      });
    } else {
      setHistory(curr => [item, ...curr]);
    }
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
      } catch (err: any) {
        // avoid
      }
    }
  };

  useEffect(() => {
    if (!session?.user) router.push('/login');
  }, [router, session?.user]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    setFavorites(stored ? JSON.parse(stored) : []);

    const historyItems = localStorage.getItem('history');
    setHistory(historyItems ? JSON.parse(historyItems) : []);
  }, []);

  const firstRun = useRef(true);
  const firstHistory = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (firstHistory.current) {
      firstHistory.current = false;
      return;
    }
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    setDisplaySearchResults(finalItinerary);
  }, [finalItinerary]);

  useEffect(() => {
    setDisplaySearchResults([]);
    setFinalItinerary([]);
  }, [viewMode]);
  const searchDiscover = async () => {
    if (!search1 || !search2) {
      showToast('Please enter a search query to continue');
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
            <button type="button" onClick={() => setViewMode('discover')} className={styles.mode}>
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
            <button type="button" onClick={() => setViewMode('saved')} className={styles.mode}>
              {viewMode === 'saved' ? (
                <AiFillHeart size={24} color={PURPLE} />
              ) : (
                <AiOutlineHeart size={24} color="black" />
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
            <button type="button" onClick={() => setViewMode('itinerary')} className={styles.mode}>
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
            <h6
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '4px',
              }}
            >
              <span>History</span>
              <button
                onClick={() => setHistory([])}
                type="button"
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                }}
              >
                <SlTrash size={12} />
              </button>
            </h6>
            <div className={styles.recentItems}>
              {history.slice(0, 3).map(item => (
                <button
                  type="button"
                  onClick={() => {
                    setGoTo({ lat: item.coordinates.latitude, lng: item.coordinates.longitude });
                    addToHistory(item);
                  }}
                  key={item.id}
                  className={styles.recentItem}
                >
                  <img src={item.image} width={24} height={24} className={styles.recentItemImage} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.logout}>
            <img src="https://source.unsplash.com/random/?big+city/" />
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
              <h6 className={styles.subheading}>
                Search for the next trendy restaurant or new activities. Like the places that you
                want to visit to save them for the next time you are in the area!
              </h6>
              <div className={styles.search}>
                {/* <button type="button" className={styles.tts} onClick={() => {}}>
                  TALK
                </button> */}
                <input
                  type="text"
                  placeholder="Quick meals..."
                  className={styles.searchText}
                  value={search1}
                  onChange={e => setSearch1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="West Hollywood, CA"
                  value={search2}
                  onChange={e => setSearch2(e.target.value)}
                />
                <button type="button" className={styles.searchBtn} onClick={() => searchDiscover()}>
                  <CiSearch size={24} />
                </button>
              </div>
              {!loading && displaySearchResults?.length === 0 ? (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <h1
                    style={{
                      marginTop: 'auto',
                      fontSize: '14px',
                      color: '#888',
                    }}
                  >
                    Enter a search to start exploring!
                  </h1>
                  <Image
                    src={Post}
                    priority
                    height={225}
                    width={135}
                    style={{
                      marginTop: 'auto',
                    }}
                    alt="Post"
                  />
                </div>
              ) : null}
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
              <h6 className={styles.subheading}>
                A list of your liked locations for you to use when building a travel itinerary in
                any city.
              </h6>
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
              {favorites?.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '10rem',
                      marginBottom: 'auto',
                      background: '#f9f9f9',
                      border: '1.5px dashed #909090',
                      strokeDasharray: 20,
                      boxShadow: '0 5px 10px rgba(0,0,0, 0.2)',
                      borderRadius: '8px',
                      display: 'grid',
                      placeItems: 'center',
                      padding: '3rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#888',
                      }}
                    >
                      You have no saved locations. Please go back to discover to start building your
                      list!
                    </p>
                  </div>
                  <Image src={Post} height={225} width={135} alt="Post" priority />
                </div>
              ) : null}
            </div>
          ) : null}
          {viewMode === 'itinerary' ? (
            <div className={styles.itinerary}>
              <h3 className={styles.header}>Create an AI-powered itinerary.</h3>
              <h6 className={styles.subheading}>
                Build a custom itinerary out of your liked locations! If you want more options, go
                to the&nbsp;
                <button
                  type="button"
                  className={styles.discoverLink}
                  onClick={() => setViewMode('discover')}
                >
                  Discover page{' '}
                </button>
                &nbsp;and like more locations in the area!
              </h6>

              {favorites.length === 0 ? (
                <h1>Hello</h1>
              ) : (
                // TODO
                <>
                  <h5>Favorite Items</h5>
                  <div className={styles.carousel}>
                    {itineraryPrompt.length === 0 ? (
                      <div
                        style={{
                          minHeight: '5rem',
                          width: '100%',
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        <p>No pending items.</p>
                      </div>
                    ) : (
                      <>
                        {itineraryPrompt.map(item => (
                          <ItineraryCard
                            key={item.id}
                            yesClick={() => {
                              setItineraryPrompt(curr => {
                                const clone = [...curr];
                                const id = clone.findIndex(elem => elem.id === item.id);
                                clone.splice(id, 1);
                                return clone;
                              });
                              setFinalItinerary(curr => [...curr, item]);
                            }}
                            noClick={() => {
                              setItineraryPrompt(curr => {
                                const clone = [...curr];
                                const id = clone.findIndex(elem => elem.id === item.id);
                                clone.splice(id, 1);
                                return clone;
                              });
                            }}
                            {...item}
                          />
                        ))}
                      </>
                    )}
                  </div>
                  <p>
                    {favorites.length - itineraryPrompt.length} / {favorites.length} selected
                  </p>
                  <h5>Selected Itinerary</h5>
                  <div>
                    {finalItinerary.map(item => (
                      <p key={item.id}>{item.name}</p>
                    ))}
                  </div>
                  <button
                    className={styles.resetItinerary}
                    type="button"
                    onClick={() => {
                      setItineraryPrompt(favorites);
                      setFinalItinerary([]);
                      setItineraryResponse('');
                    }}
                  >
                    Reset Itinerary Options
                  </button>
                  <h5>Generate</h5>
                  <button
                    className={styles.generateItinerary}
                    type="button"
                    onClick={() => {
                      if (itineraryPrompt.length > 0) {
                        showToast('Please include or remove all options for your itinerary!');
                        return;
                      }
                      if (finalItinerary.length === 0) {
                        showToast(
                          'You must select as least one item to include in your itinerary!'
                        );
                        return;
                      }
                      setItineraryLoad(true);
                      fetchCohere(finalItinerary.map(item => item.name))
                        .then(() => {
                          setItineraryLoad(false);
                        })
                        .catch(() => {
                          // nothing
                        });
                    }}
                  >
                    Generate Itinerary
                  </button>
                  {itineraryLoad ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100%',
                        gap: '1rem',
                      }}
                    >
                      <LoadingIcons.Puff stroke="#c8a0d8" strokeOpacity={0.75} />
                      <h1>Thank you for your patience!</h1>
                      <h1> ଘ(੭ˊᵕˋ)੭* ੈ✩‧˚</h1>
                    </div>
                  ) : (
                    <pre className={styles.response}>{itineraryResponse}</pre>
                  )}
                </>
              )}
            </div>
          ) : null}
        </section>
        <section className={styles.map}>
          <MapComponent favorites={favorites} goTo={goTo} markers={displaySearchResults} />
        </section>
      </div>
    </>
  );
};

export default Home;
