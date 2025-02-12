import fastify from 'fastify';
import { rootApp } from '../app/rootApp.js';
import { animalRepoStub } from './stubs.js';

export function createTestApp() {
	const app = fastify({ logger: false });

	app.register(rootApp, {
		repos: { animalRepo: animalRepoStub },
	});

	return app;
}
