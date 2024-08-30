import { tesloApi } from "@/api/tesloApi"
import type { Product } from "../interfaces/product.interface"
import { getProductImageAction } from "./get-product-image.action"

export const getProductsAction = async( page: number = 1, limit: number=10) => {
    try {
        const { data } = await tesloApi.get<Product[]>(`/products?limit=${limit}&offset=${(page -1) * limit}`)

        return data.map( p => ({
            ...p,
            images: p.images.map(getProductImageAction)
        }))
    } catch (error) {
        throw new Error('Error al traer los productos!')
    } 
}