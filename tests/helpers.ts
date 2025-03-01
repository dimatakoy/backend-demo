import fastify from 'fastify';
import { vi } from 'vitest';
import { rootApp } from '../app/rootApp.js';

export const animalServiceMock = {
	getById: vi.fn(),
	all: vi.fn(),
};

export function createTestApp() {
	const app = fastify({ logger: false });

	const deps = {
		animalService: animalServiceMock,
	};

	app.register(rootApp, {
		deps,
	});

	return app;
}
