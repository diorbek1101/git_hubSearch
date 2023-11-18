import { Base } from '../entities';

export class BaseRepository<T extends Base> {
	protected list: T[] = [];
	protected id = 1;

	add(item: T) {
		item.setId(this.id++);
		this.list.push(item);
	}

	getList() {
		return this.list;
	}

	getByIndex(index: number) {
		return this.list[index];
	}

	delete(id: number) {
		const idx = this.list.findIndex((item) => item.getId() === id);

		if (idx === undefined) throw new Error(`Not found with id=${id}`);

		return this.list.splice(idx, 1)[0];
	}

	getById(id: number) {
		const idx = this.list.findIndex((item) => item.getId() === id);

		if (idx === undefined) throw new Error(`Not found with id=${id}`);

		return this.list[idx];
	}

	isExist(predicate: (item: T) => unknown) {
		return this.list.some(predicate);
	}
}

type Format = '5D' | '3D' | '4K';
type Company = 'Marvel' | 'Gold Vision' | 'Americano' | 'PDP';

class Movie {
	constructor(
		public name: string,
		public format: Format,
		public company: Company,
		public price: number
	) {}
}

class Cinema<T extends Movie> {
	list: T[] = [];

	getWithFormat(format: Format) {}
	getWithPrice(price: number) {}
	getWithCompany(company: Company) {}
}

class Avatar extends Movie {}
class SpiderMan extends Movie {}

class XivaCinema extends Cinema<Avatar> {}
class TashkentCinema extends Cinema<Avatar> {}
