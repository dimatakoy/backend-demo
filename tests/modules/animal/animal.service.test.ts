import { AnimalService } from '#app/modules/animal/animal.service.js';
import { createAnimal, randomId } from '#tests/factories.js';
import { expect, test, vi } from 'vitest';

const repo = {
	getById: vi.fn(),
	all: vi.fn(),
};

const service = new AnimalService(repo);

test('returns all animals', async () => {
	const animals = [createAnimal(), createAnimal()];
	repo.all.mockResolvedValue(animals);

	const result = await service.all({ skip: 0, take: 100 });

	expect(repo.all).toBeCalledWith({ skip: 0, take: 100 });
	expect(result).toStrictEqual(animals);
});

test('returns known animal', async () => {
	const animal = createAnimal();
	repo.getById.mockResolvedValue(animal);

	const result = await service.getById(animal.id);

	expect(repo.getById).toBeCalledWith(animal.id);
	expect(result).toStrictEqual(animal);
});

test('returns unknown animal', async () => {
	const id = randomId();
	repo.getById.mockResolvedValue(null);

	const result = await service.getById(id);

	expect(repo.getById).toBeCalledWith(id);
	expect(result).toStrictEqual(null);
});
