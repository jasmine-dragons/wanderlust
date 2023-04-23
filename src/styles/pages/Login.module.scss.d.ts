export type Styles = {
  balloon1: string;
  balloon2: string;
  container: string;
  content: string;
  header: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
