import type { IAnimalRepository, IAnimalService, IPaginationQuery } from './animal.types.js';

export class AnimalService implements IAnimalService {
	#repo;

	constructor(repo: IAnimalRepository) {
		this.#repo = repo;
	}

	async getById(id: number) {
		return this.#repo.getById(id);
	}

	async all(query: IPaginationQuery) {
		return this.#repo.all(query);
	}
}
