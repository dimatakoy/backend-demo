import type { PrismaClient } from '@prisma/client';

interface Animal {
	id: number;
	name: string;
}

export interface AnimalRepo {
	getById: (id: number) => Promise<Animal | null>;
	all: (payload: { skip: number; take: number }) => Promise<Animal[]>;
}

export function createAnimalRepo(prisma: PrismaClient): AnimalRepo {
	return {
		async getById(id) {
			const animal = await prisma.animal.findUnique({
				where: { id },
				select: { id: true, name: true },
			});

			return animal;
		},

		async all({ skip, take }) {
			const animals = await prisma.animal.findMany({
				skip,
				take,
				select: { id: true, name: true },
			});

			return animals;
		},
	};
}
