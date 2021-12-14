export interface Product {
	id: string;
	ownerId: string;
	title: string;
	imageUrl: string;
	description: string;
	price: number;
	ownerPushToken: string;
}

export function createProduct(
	id: string,
	ownerId: string,
	title: string,
	imageUrl: string,
	description: string,
	price: number,
	ownerPushToken: string
): Product {
	return {
		id,
		ownerId,
		title,
		imageUrl,
		description,
		price,
		ownerPushToken,
	};
}
