import { LatLng } from 'leaflet';

export interface IUserProfile {
  name: string;
  email: string;
  password: string;
  address: string;
  latlng: LatLng;
}
