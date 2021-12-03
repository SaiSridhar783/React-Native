export interface ICartItem {
	quantity: number;
	productPrice: number;
	productTitle: string;
	sum: number;
}

export interface ICartItemArray {
	productId: string;
	productTitle: string;
	productPrice: number;
	quantity: number;
	sum: number;
}

export function createCartItem(
	quantity: number,
	productPrice: number,
	productTitle: string
): ICartItem {
	return {
		quantity,
		productPrice,
		productTitle,
		sum: productPrice * quantity,
	};
}
