export interface CartItem {
	quantity: number;
	productPrice: number;
	productTitle: string;
	sum: number;
}

export function createCartItem(
	quantity: number,
	productPrice: number,
	productTitle: string
): CartItem {
	return {
		quantity,
		productPrice,
		productTitle,
		sum: productPrice * quantity,
	};
}
