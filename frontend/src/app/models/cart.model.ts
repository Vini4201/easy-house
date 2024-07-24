import { Property } from "./property";

export interface Cart {
  id: number;
  buyerId: number;
  propertyName: string;
  propertyCost: number;
  property: Property;
}

