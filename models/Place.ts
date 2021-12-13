export class Place {
	constructor(
		public id: string,
		public title: string,
		public imageUri: string,
		public address: string,
		public coords: { lat: number; lng: number }
	) {}
}
