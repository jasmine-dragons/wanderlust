import styles from './style.module.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = (props: ButtonProps) => {
  const { onClick, text } = props;
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
