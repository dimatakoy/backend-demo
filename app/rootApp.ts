import type { FastifyPluginAsync } from 'fastify';
import { type AnimalRepo } from './repos/animal.repo.js';
import { animalRoutes } from './routes/api/v1/animals.js';
import { systemRoutes } from './routes/system.js';

interface AppOptions {
	repos: { animalRepo: AnimalRepo };
}

const plugin: FastifyPluginAsync<AppOptions> = async (app, options) => {
	app.register(systemRoutes, { prefix: '/system' });
	app.register(animalRoutes, { prefix: '/api/v1/animals', repo: options.repos.animalRepo });
};

export { plugin as rootApp };
