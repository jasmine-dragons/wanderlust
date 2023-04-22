export type Styles = {
  container: string;
  image: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
