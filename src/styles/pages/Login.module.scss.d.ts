export type Styles = {
  balloon1: string;
  balloon2: string;
  bob1: string;
  bob2: string;
  container: string;
  content: string;
  fade: string;
  header: string;
  subheading: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
