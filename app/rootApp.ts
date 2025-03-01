import type { FastifyPluginAsync } from 'fastify';
import type { IAnimalService } from './modules/animal/animal.types.js';
import { animalRoutes } from './routes/api/v1/animals.js';
import { systemRoutes } from './routes/api/v1/system.js';

interface AppOptions {
	deps: {
		animalService: IAnimalService;
	};
}

export const rootApp: FastifyPluginAsync<AppOptions> = async (app, options) => {
	app.register(systemRoutes, { prefix: '/api/v1/system' });
	app.register(animalRoutes, { prefix: '/api/v1/animals', service: options.deps.animalService });
};
