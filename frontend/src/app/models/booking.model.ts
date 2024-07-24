import { Property } from "./property";

export interface Booking {
  id: number;
  orderId: string;
  buyerId: number;
  sellerId: number;
  property: Property;
  propertyName: string;
  propertyCost: number;
  paymentMethod: 'CASH' | 'CHEQUE' | 'ONLINE';
  paymentStatus: 'PENDING' | 'FAILED' | 'SUCCESS';
  propertyBuyDate: Date;
}
