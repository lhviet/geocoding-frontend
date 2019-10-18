export interface MapState {
  locale?: GeocodingLocale;
  center?: Marker;
  locations: Array<Marker>;
  isProcessing: boolean;
}

export interface MarkerState {
  markers: Array<Marker>;
  processingMarkerId: number;
  getMarkersStatus: APIStatus;
  deleteMarkerStatus: APIStatus;
  saveMarkerStatus: APIStatus;
  updateMarkerStatus: APIStatus;
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
  created_at?: Date;
  updated_at?: Date;
}

export type Point = [number, number];

export enum GeocodingLocale {
  DE = 'DE',
}
export enum APIStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  FAILED = 'FAILED',
}