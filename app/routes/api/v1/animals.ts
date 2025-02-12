import type { FastifyPluginAsync } from 'fastify';
import type { AnimalRepo } from '../../../repos/animal.repo.js';

type PluginOptions = {
	repo: AnimalRepo;
};

export const animalRoutes: FastifyPluginAsync<PluginOptions> = async (app, options) => {
	app.route({
		method: 'get',
		url: '/',
		async handler(_request, reply) {
			const skip = 0;
			const take = 100;

			const animals = await options.repo.all({ skip, take });

			return reply.status(200).send({
				items: animals,
			});
		},
	});

	app.route({
		method: 'get',
		url: '/:id',
		async handler(request, reply) {
			const id = request.params.id;

			const animal = await options.repo.getById(Number(id));

			if (!animal) {
				return reply.status(410).send({
					code: 'animal_not_found',
				});
			}

			return reply.status(200).send(animal);
		},
	});
};
