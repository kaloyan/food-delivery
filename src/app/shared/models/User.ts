import { LatLng } from 'leaflet';

export class User {
  id!: string;
  name!: string;
  email!: string;
  token!: string;
  address!: string;
  isAdmin!: boolean;
  latlng!: LatLng;
}
