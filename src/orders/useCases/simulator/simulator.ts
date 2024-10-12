import { ISimulateOrderPayload } from "src/orders/dto/simulatePayment.dto";
import { SimulatePaymentSimulationDTO } from "src/orders/dto/simulatePaymentSimulation.dto";

export function simulatePaymentSimulationThroughAPI(simulatePaymentDTO: SimulatePaymentSimulationDTO): { data: object } {

    // Obs: Return any value, just to simulate the API call, once its offline

    return {
        data: {
            maxPaymentTermDays: 90,
            totalOrderAmountCents: 1000,
            invoiceTotalsWithFees: [
              {
                totalInvoiceAmountCents: 1100,
                fees: {
                  buyerFeesCents: 100,
                  buyerFeesPercentage: 0.1
                },
                paymentTermDays: 30
              }
            ],
            installments: [
              {
                maturityDate: "2024-02-10T00:00:00Z",
                faceValueCents: 1020000
              },
              {
                maturityDate: "2024-03-10T00:00:00Z",
                faceValueCents: 1020000
              },
              {
                maturityDate: "2024-04-10T00:00:00Z",
                faceValueCents: 1020000
              }
            ]
          }
    }
}

export function simulatePaymentThroughAPI(simulatedPayload: ISimulateOrderPayload) : { data: any } {
    // Obs: Return any value, just to simulate the API call
    const buyerFeeCents = 10978;

    return {
        data: {
            id: "46dd63dd-1be4-4658-8deb-fa5dc578ad0b",
            externalId: simulatedPayload.externalId,
            subtotalAmountCents: simulatedPayload.subtotalAmountCents,
            taxAmountCents: simulatedPayload.taxAmountCents,
            shippingCostCents: simulatedPayload.shippingCostCents,
            buyerFeesCents: buyerFeeCents,
            totalAmountCents: simulatedPayload.subtotalAmountCents + simulatedPayload.taxAmountCents + simulatedPayload.shippingCostCents + buyerFeeCents,
            shippingLocation: simulatedPayload.shippingLocation,
            paymentTermDays: 30,
            status: "created",
            estimatedDeliveryDate: "2024-02-05T00:00:00Z",
            createdAt: "2024-02-01T00:00:00Z",
            sellerTaxId: simulatedPayload.sellerTaxId,
            buyerTaxId: simulatedPayload.buyerTaxId,
            installments: simulatedPayload.installments
        }
    }


}

export function simulateShippingCostCents(): { data: { shippingCostCents: number } } {
    // Obs: Return any value, just to simulate the API call

    return {
        data: {
            shippingCostCents: 1000
        }
    }
}