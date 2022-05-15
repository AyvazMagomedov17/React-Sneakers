export interface productType {
    id: string
    title: string
    price: number
    img: string,
    isLiked: boolean,
    isInBasket: boolean
    idForBasket: number,
    description: string
}
export interface filterType {
    isLiked?: any,
    title?: string
};

