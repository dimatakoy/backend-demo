import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { createAnimalRepo } from './repos/animal.repo.js';
import { rootApp } from './rootApp.js';

const app = fastify();
const prisma = new PrismaClient();

app.register(rootApp, {
	repos: {
		animalRepo: createAnimalRepo(prisma),
	},
});

await app.listen({ port: 3000 });
