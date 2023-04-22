export type Styles = {
  container: string;
  image: string;
  line: string;
  map: string;
  menu: string;
  mode: string;
  modes: string;
  recentItem: string;
  recentItemImage: string;
  recents: string;
  sidebar: string;
  sidebarTitle: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
