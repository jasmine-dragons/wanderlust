import { MapItemType } from '@/lib/types';
import Tiktok from '@/public/tiktok.png';
import TiktokDark from '@/public/tiktokdark.png';
import Image from 'next/image';
import { useState } from 'react';
import { AiFillHeart, AiOutlineCheck, AiOutlineHeart } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './style.module.scss';
interface Prop {
  favorited: boolean;
  favorite: () => void;
  small: boolean;
}

type IProps = Prop & MapItemType;

const ItemCard = (props: IProps) => {
  const {
    image,
    name,
    favorited,
    displayAddress,
    price,
    isClosed,
    yelpPage,
    tiktokVideo,
    impressions,
    transactions,
    categories,
    favorite,
    small,
  } = props;

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <img src={image} alt="Location Image" className={styles.cover} />
      <div className={styles.content}>
        <div className={styles.row}>
          <h1>{name}</h1>
          <button className={styles.favorite} onClick={favorite}>
            {favorited ? <AiFillHeart color="red" /> : <AiOutlineHeart color="black" />}
          </button>
        </div>
        <div className={styles.row}>
          <p>{displayAddress.join(', ')}</p>
        </div>
        <div className={styles.tags}>
          {categories.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {small ? (
          <button className={styles.expand} onClick={() => setExpanded(s => !s)}>
            <IoIosArrowDown
              fill="white"
              size={24}
              style={{
                transform: `rotate(${expanded ? 180 : 0}deg)`,
                transition: '0.3s ease-in-out',
              }}
            />
          </button>
        ) : null}
        {small && !expanded ? null : (
          <>
            <hr className={styles.divider}></hr>
            <p>
              {price ? `${price} · ` : ''}
              <span
                style={{
                  color: isClosed ? '#b93b3b' : '#3bb966',
                }}
              >
                {isClosed ? 'Closed' : 'Open'}
              </span>
            </p>
            <p>Impressions</p>
            <div className={styles.tiktokViews}>
              <Image src={Tiktok} alt="tiktok" width={16} height={16} />
              <span>{impressions.toLocaleString('en')}</span>
            </div>
            <div className={styles.transactions}>
              {transactions.map(item => (
                <div key={item} className={styles.check}>
                  <AiOutlineCheck color="#3bb966" />
                  {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.links}>
        <a href={yelpPage} className={styles.yelpLink}>
          View Website
        </a>
        <a href={tiktokVideo}>
          <Image src={TiktokDark} alt="tiktok" width={48} height={48} />
        </a>
      </div>
    </div>
  );
};
export default ItemCard;
