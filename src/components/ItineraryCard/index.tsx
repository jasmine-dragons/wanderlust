import { MapItemType } from '@/lib/types';
import { AiOutlineCheck } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import styles from './style.module.scss';

type IProps = MapItemType & {
  yesClick: () => void;
  noClick: () => void;
};

const ItineraryCard = (props: IProps) => {
  const { image, name, displayAddress, categories, yesClick, noClick } = props;

  return (
    <div className={styles.card}>
      <img src={image} className={styles.cover} />
      <div className={styles.content}>
        <div className={styles.row}>
          <h1>{name}</h1>
        </div>
        <div className={styles.row}>
          <p>{displayAddress.join(', ')}</p>
        </div>
        <div className={styles.tags}>
          {categories.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className={styles.links}>
        <button type="button" className={styles.noButton} onClick={noClick}>
          <RxCross1 />
          <span>No</span>
        </button>
        <button type="button" className={styles.yesButton} onClick={yesClick}>
          <AiOutlineCheck />
          <span>Yes</span>
        </button>
      </div>
    </div>
  );
};
export default ItineraryCard;
