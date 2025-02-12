import { faker } from '@faker-js/faker';

export function createAnimal() {
	return {
		id: faker.number.int(),
		name: faker.animal.type(),
	};
}
