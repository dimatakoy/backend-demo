import type { AnimalRepo } from '../app/repos/animal.repo.js';

export const animalRepoStub: AnimalRepo = {
	async getById() {
		return null;
	},
	async all() {
		return [];
	},
};
