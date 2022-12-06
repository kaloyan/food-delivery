import { environment } from 'src/environments/environment';

const BASE_URL = environment.production ? '' : 'http://localhost:3000';

export const IMAGES_HOST = 'http://food-delivery.us.to';

export const FOODS_URL = BASE_URL + '/api/foods';
export const TAGS_URL = BASE_URL + '/api/foods/tags';
export const SEARCH_URL = BASE_URL + '/api/foods/search/';
export const FOOD_BY_TAG_URL = BASE_URL + '/api/foods/tag/';
export const FOOD_BY_ID_URL = BASE_URL + '/api/foods/';

export const LOGIN_URL = BASE_URL + '/api/users/login';
export const REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = BASE_URL + '/api/orders/create';
export const MY_ORDERS_URL = BASE_URL + '/api/orders/my-orders';
export const ORDER_PAY_URL = BASE_URL + '/api/orders/pay';
export const ORDER_TRACK_URL = BASE_URL + '/api/orders/track/';
