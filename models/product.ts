export interface Product {
	id: string;
	ownerId: string;
	title: string;
	imageUrl: string;
	description: string;
	price: number;
}

export function createProduct(
	id: string,
	ownerId: string,
	title: string,
	imageUrl: string,
	description: string,
	price: number
): Product {
	return {
		id,
		ownerId,
		title,
		imageUrl,
		description,
		price,
	};
}
