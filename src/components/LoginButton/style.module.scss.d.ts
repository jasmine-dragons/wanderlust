export type Styles = {
  login: string;
  logout: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
