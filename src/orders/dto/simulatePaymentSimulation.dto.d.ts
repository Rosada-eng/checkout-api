export interface ISimulatePaymentSimulationDTO {
    buyerTaxId: string
    sellerTaxId: string
    totalOrderAmountCents: number
    maxNumberOfInstallments: number
    periodDuration: number
}