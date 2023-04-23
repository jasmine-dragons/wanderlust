export type Styles = {
  appear: string;
  pin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
