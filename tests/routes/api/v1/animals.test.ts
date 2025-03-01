import { expect, test, vi } from 'vitest';
import { createAnimal } from '../../../factories.js';
import { animalServiceMock, createTestApp } from '../../../testApp.js';

test('returns all animals', async (ctx) => {
	const app = await createTestApp(ctx);

	const animals = [createAnimal(), createAnimal()];
	let mock = vi.spyOn(animalServiceMock, 'all').mockResolvedValue(animals);

	const response = await app.inject({
		url: `/api/v1/animals`,
	});

	expect(mock).toBeCalledWith({ skip: 0, take: 100 });

	expect(response.statusCode).toBe(200);
	expect(response.json()).toStrictEqual({
		items: animals,
	});
});

test('returns known animal', async (ctx) => {
	const app = await createTestApp(ctx);

	const animal = createAnimal();
	let mock = vi.spyOn(animalServiceMock, 'getById').mockResolvedValue(animal);

	const response = await app.inject({ url: `/api/v1/animals/${animal.id}` });

	expect(mock).toBeCalledWith(animal.id);

	expect(response.statusCode).toBe(200);
	expect(response.json()).toStrictEqual(animal);
});

test('returns unknown animal', async (ctx) => {
	const app = await createTestApp(ctx);

	const unknownAnimal = createAnimal();

	const response = await app.inject({ url: `/api/v1/animals/${unknownAnimal.id}` });

	expect(response.statusCode).toBe(410);
	expect(response.json()).toStrictEqual({ code: 'animal_not_found' });
});
