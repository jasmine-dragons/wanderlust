import { MapItemType } from '@/lib/types';
import Tiktok from '@/public/tiktok.png';
import TiktokDark from '@/public/tiktokdark.png';
import Image from 'next/image';
import { AiFillHeart, AiOutlineCheck, AiOutlineHeart } from 'react-icons/ai';
import styles from './style.module.scss';

interface Prop {
  favorited: boolean;
  favorite: () => void;
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
  } = props;
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
          {/* {phone ? <a href={`tel:${phone}`}>{phone}</a> : null} */}
        </div>
        <div className={styles.tags}>
          {categories.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
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
