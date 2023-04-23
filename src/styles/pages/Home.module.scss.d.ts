export type Styles = {
  appear: string;
  carousel: string;
  container: string;
  discoverLink: string;
  discovery: string;
  discoveryHeader: string;
  discoverySubtitle: string;
  header: string;
  itinerary: string;
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
  response: string;
  saved: string;
  savedHeader: string;
  search: string;
  sidebar: string;
  sidebarTitle: string;
  subheading: string;
  tts: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
