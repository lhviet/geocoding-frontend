export interface MapState {
}

export interface MarkerState {
  markers: Array<Marker>;
  isGettingMarkers: boolean;
  isDeletingMarkers: boolean;
}

export interface StoreState {
  map: MapState;
  marker: MarkerState;
}

export interface Marker {
  id: number;
  title: string;
  lng: number;
  lat: number;
  desc: string;
  created_at: Date;
  updated_at: Date;
}