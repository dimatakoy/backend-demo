import type { FastifyPluginAsync } from 'fastify';

const systemRoutes: FastifyPluginAsync = async (app) => {
	app.get('/ok', async (_request, reply) => {
		reply.status(200).send({ ok: true });
	});
};

export { systemRoutes };
