export class Meal {
	constructor(
		public id: string | number,
		public categoryIds: string[],
		public title: string,
		public affordability: string,
		public complexity: string,
		public imageUrl: string,
		public duration: number,
		public ingredients: string[],
		public steps: string[],
		public isGlutenFree: boolean,
		public isVegan: boolean,
		public isVegetarian: boolean,
		public isLactoseFree: boolean
	) {}
}
