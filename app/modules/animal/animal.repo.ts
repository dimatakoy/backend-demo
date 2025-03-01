import type { PrismaClient } from '@prisma/client';
import type { IAnimalRepository, IPaginationQuery } from './animal.types.js';

export class AnimalRepo implements IAnimalRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async getById(id: number) {
		const animal = await this.prisma.animal.findUnique({
			where: { id },
			select: { id: true, name: true },
		});

		return animal;
	}

	async all(query: IPaginationQuery) {
		const animals = await this.prisma.animal.findMany({
			skip: query.skip,
			take: query.take,
			select: { id: true, name: true },
		});

		return animals;
	}
}
