import * as T from 'types';
import configureStore from '../3_store/configureStore';

export const mockState: T.StoreState = {
  marker: {
    markers: [
      {
        id: 1,
        title: 'Marker 1',
        lat: 80,
        lng: 120,
        desc: 'dump Marker description 1'
      },
    ],
    processingMarkerId: -1,
    getMarkersStatus: T.APIStatus.IDLE,
    deleteMarkerStatus: T.APIStatus.IDLE,
    saveMarkerStatus: T.APIStatus.IDLE,
    updateMarkerStatus: T.APIStatus.IDLE,
  },
  map: {
    locations: [],
    isProcessing: false,
  },
};

export const mockStore = configureStore([]);