import { faker } from '@faker-js/faker';

export function randomId() {
	return faker.number.int();
}

export function createAnimal() {
	return {
		id: faker.number.int(),
		name: faker.animal.type(),
	};
}
