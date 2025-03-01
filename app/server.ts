import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { AnimalRepo } from './modules/animal/animal.repo.js';
import { AnimalService } from './modules/animal/animal.service.js';
import { rootApp } from './rootApp.js';

const prisma = new PrismaClient();

const app = fastify();

const deps = {
	animalService: new AnimalService(new AnimalRepo(prisma)),
};

app.register(rootApp, {
	deps,
});

await app.listen({ port: 3000 });
