import { ICartItemArray } from "./cart-item";

export interface IOrder {
	id: string;
	items: ICartItemArray[];
	totalAmount: number;
	date: Date;
}

export function createOrder(
	id: string,
	items: ICartItemArray[],
	totalAmount: number,
	date: Date
): IOrder {
	return {
		id,
		items,
		totalAmount,
		date,
	};
}
