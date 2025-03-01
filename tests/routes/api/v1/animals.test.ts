import { createAnimal, randomId } from '#tests/factories.js';
import { animalServiceMock, createTestApp } from '#tests/testApp.js';
import { expect, test } from 'vitest';

test('returns all animals', async (ctx) => {
	const app = await createTestApp(ctx);

	const animals = [createAnimal(), createAnimal()];
	animalServiceMock.all.mockResolvedValue(animals);

	const response = await app.inject({
		url: `/api/v1/animals`,
	});

	expect(animalServiceMock.all).toBeCalledWith({ skip: 0, take: 100 });

	expect(response.statusCode).toBe(200);
	expect(response.json()).toStrictEqual({
		items: animals,
	});
});

test('returns known animal', async (ctx) => {
	const app = await createTestApp(ctx);

	const animal = createAnimal();
	animalServiceMock.getById.mockResolvedValue(animal);

	const response = await app.inject({ url: `/api/v1/animals/${animal.id}` });

	expect(animalServiceMock.getById).toBeCalledWith(animal.id);

	expect(response.statusCode).toBe(200);
	expect(response.json()).toStrictEqual(animal);
});

test('returns unknown animal', async (ctx) => {
	const app = await createTestApp(ctx);

	const id = randomId();

	const response = await app.inject({ url: `/api/v1/animals/${id}` });

	expect(response.statusCode).toBe(410);
	expect(response.json()).toStrictEqual({ code: 'animal_not_found' });
});
