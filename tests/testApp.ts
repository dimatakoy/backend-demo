import fastify from 'fastify';
import { vi, type TestContext } from 'vitest';
import { rootApp } from '../app/rootApp.js';

export const animalServiceMock = {
	getById: vi.fn(),
	all: vi.fn(),
};

export async function createTestApp(testContext: TestContext) {
	const app = fastify({ logger: false });

	testContext.onTestFinished(async () => {
		await app.close();
	});

	const deps = {
		animalService: animalServiceMock,
	};

	app.register(rootApp, {
		deps,
	});

	await app.ready();

	return app;
}
