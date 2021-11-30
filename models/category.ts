class Category {
	id: number | string;
	title: string;
	color: string;

	constructor(id: string | number, title: string, color: string) {
		this.id = id;
		this.title = title;
		this.color = color;
	}
}

export default Category;
