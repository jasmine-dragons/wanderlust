export type Styles = {
  container: string;
  discovery: string;
  discoveryHeader: string;
  discoverySubtitle: string;
  line: string;
  logout: string;
  map: string;
  menu: string;
  mode: string;
  modes: string;
  recentItem: string;
  recentItemImage: string;
  recentItems: string;
  recents: string;
  saved: string;
  savedHeader: string;
  search: string;
  sidebar: string;
  sidebarTitle: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
