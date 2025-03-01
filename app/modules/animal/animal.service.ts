import type { IAnimalRepository, IAnimalService, IPaginationQuery } from './animal.types.js';

export class AnimalService implements IAnimalService {
	constructor(private readonly repo: IAnimalRepository) {}

	async getById(id: number) {
		return this.repo.getById(id);
	}

	async all(query: IPaginationQuery) {
		return this.repo.all(query);
	}
}
