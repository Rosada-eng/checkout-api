export interface IProduct {
    id: string
    
    name: string
    
    defaultUnitPriceCents: number
    
    imageUrl:? string | null
    
    createdAt: Date
    
    updatedAt: Date
}