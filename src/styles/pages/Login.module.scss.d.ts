export type Styles = {
  container: string;
  content: string;
  header: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
