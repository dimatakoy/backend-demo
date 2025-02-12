import type { FastifyInstance } from 'fastify';
import { beforeAll, expect, test, vi } from 'vitest';
import { createAnimal } from '../../../factories.js';
import { createTestApp } from '../../../helpers.js';
import { animalRepoStub } from '../../../stubs.js';

let app: FastifyInstance;

beforeAll(async () => {
	app = createTestApp();
	await app.ready();

	return async () => {
		await app.close();
	};
});

test('returns all animals', async () => {
	const animals = [createAnimal(), createAnimal()];
	let mock = vi.spyOn(animalRepoStub, 'all').mockResolvedValue(animals);

	const response = await app.inject({
		url: `/api/v1/animals`,
	});

	expect(mock).toBeCalledWith({ skip: 0, take: 100 });

	expect(response.statusCode).toBe(200);
	expect(response.json()).toStrictEqual({
		items: animals,
	});
});

test('returns known animal', async () => {
	const animal = createAnimal();
	let mock = vi.spyOn(animalRepoStub, 'getById').mockResolvedValue(animal);

	const response = await app.inject({ url: `/api/v1/animals/${animal.id}` });

	expect(mock).toBeCalledWith(animal.id);

	expect(response.statusCode).toBe(200);
	expect(response.json()).toStrictEqual(animal);
});

test('returns unknown animal', async () => {
	const unknownAnimal = createAnimal();

	const response = await app.inject({ url: `/api/v1/animals/${unknownAnimal.id}` });

	expect(response.statusCode).toBe(410);
	expect(response.json()).toStrictEqual({ code: 'animal_not_found' });
});
