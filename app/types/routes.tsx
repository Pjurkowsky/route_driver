import { Timestamp } from "firebase/firestore";

export type Coordinates = {
  latitude: number;
  longitude: number;
};
export type Route = {
  geolocation: Coordinates;
  street: string;
  street_number: string;
  phone_number: string;
  description: string;
  order: Order;
  skip: boolean;
};

export type RoutesData = {
  id: string;
  name: string;
  route: Route[];
  starting_at: Timestamp;
  kilometers: number;
  status?: string;
  userId?: string;
};

export type Item = {
  id: string;
  name: string;
};

export type Order = {
  product_name: string;
  price: number;
  quantity: number;
};
