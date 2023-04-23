export type Styles = {
  card: string;
  content: string;
  cover: string;
  favorite: string;
  links: string;
  noButton: string;
  row: string;
  slideIn: string;
  tags: string;
  yesButton: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
