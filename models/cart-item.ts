export interface ICartItem {
	quantity: number;
	productPrice: number;
	productTitle: string;
	sum: number;
	pushToken: string;
}

export interface ICartItemArray {
	productId: string;
	productTitle: string;
	productPrice: number;
	quantity: number;
	sum: number;
	productPushToken: string;
}

export function createCartItem(
	quantity: number,
	productPrice: number,
	productTitle: string,
	pushToken: string
): ICartItem {
	return {
		quantity,
		productPrice,
		productTitle,
		sum: productPrice * quantity,
		pushToken,
	};
}
