import { IProduct } from "src/products/entities/product.model";

interface IShippingLocation {
    address1: string;
    address2: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
}

interface IInstallment {
    maturityDate: string;
    faceValueCents: number;
}

interface IItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPriceCents: number;
}

interface ISimulateOrderPayload {
    externalId: string;
    subtotalAmountCents: number;
    taxAmountCents: number;
    shippingCostCents: number;
    shippingLocation: ShippingLocation;
    estimatedDeliveryDateUTC: string;
    installments: Installment[];
    sellerTaxId: string;
    buyerTaxId: string;
    items: IItem[];
}