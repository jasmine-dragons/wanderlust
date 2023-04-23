export interface TiktokResponse {
  name: string;
  impressions: number;
  video: string;
}

export interface MapItemType {
  image: string;
  name: string;
  isClosed: boolean;
  yelpPage: string;
  tiktokVideo: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  impressions: number;
  displayAddress: string[];
  id: string;
  transactions: string[];
  price?: string;
  categories: string[];
  phone: string;
}
