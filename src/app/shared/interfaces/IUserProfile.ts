export interface IUserProfile {
  name: string;
  email: string;
  password: string;
  address: string;
  latlng: {
    lat: string;
    lng: string;
  };
}
