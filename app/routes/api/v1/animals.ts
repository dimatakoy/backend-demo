import { Type, type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import type { IAnimalService } from '../../../modules/animal/animal.types.js';
import { PaginationQuery } from '../../../schema.js';

const AnimalNotFoundError = Type.Object({
	code: Type.Literal('animal_not_found'),
});

const Animal = Type.Object({
	id: Type.Number(),
	name: Type.String(),
});

const AnimalList = Type.Object({
	items: Type.Array(Animal),
});

type PluginOptions = {
	service: IAnimalService;
};

export const animalRoutes: FastifyPluginAsyncTypebox<PluginOptions> = async (app, options) => {
	const { service } = options;

	app.route({
		method: 'get',
		url: '/',
		schema: {
			querystring: PaginationQuery,
			response: {
				200: AnimalList,
			},
		},
		async handler(request, reply) {
			const { skip, take } = request.query;

			const animals = await service.all({ skip, take });

			return reply.status(200).send({
				items: animals,
			});
		},
	});

	app.route({
		method: 'get',
		url: '/:id',
		schema: {
			params: Type.Object({
				id: Type.Number(),
			}),

			response: {
				410: AnimalNotFoundError,
				200: Animal,
			},
		},
		async handler(request, reply) {
			const id = request.params.id;

			const animal = await service.getById(id);

			if (!animal) {
				return reply.status(410).send({
					code: 'animal_not_found',
				});
			}

			return reply.status(200).send(animal);
		},
	});
};
