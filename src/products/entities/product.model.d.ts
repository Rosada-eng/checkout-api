export interface IProduct {
    id: string
    
    name: string
    
    unitPriceCents: number
    
    imageUrl:? string | null
    
    createdAt: Date
    
    updatedAt: Date
}