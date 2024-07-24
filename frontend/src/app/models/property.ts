export class Property {
    id!: number;
    sellerId!: number;
    propertyName!: string;
    propertyType?: string;
    propertyCost?: number;
    propertyArea!: number;
    propertyAddress!: string;
    propertyDescription?: string;
    propertyImageUrl?: string;
    propertyStatus!: string;
    propertyPostDate?: Date;
}
