export interface IAnimal {
	id: number;
	name: string;
}

export interface IPaginationQuery {
	skip: number;
	take: number;
}

export interface IAnimalRepository {
	getById: (id: number) => Promise<IAnimal | null>;
	all: (query: IPaginationQuery) => Promise<IAnimal[]>;
}

export type IAnimalService = IAnimalRepository;
