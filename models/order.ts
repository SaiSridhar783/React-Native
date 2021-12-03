import { ICartItemArray } from "./cart-item";

export interface IOrder {
	id: string;
	items: ICartItemArray[];
	totalAmount: number;
	date: Date;
	readableDate: string;
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
		readableDate: date.toLocaleDateString("en-IN", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}),
	};
}
