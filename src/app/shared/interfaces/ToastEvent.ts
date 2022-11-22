import { EventTypes } from '../models/EventTypes';

export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}
