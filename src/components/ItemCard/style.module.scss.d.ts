export type Styles = {
  card: string;
  check: string;
  content: string;
  cover: string;
  favorite: string;
  links: string;
  row: string;
  tags: string;
  tiktokViews: string;
  transactions: string;
  yelpLink: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
