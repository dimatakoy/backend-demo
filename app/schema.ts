import { Type } from '@sinclair/typebox';

export const PaginationQuery = Type.Object({
	skip: Type.Number({ default: 0 }),
	take: Type.Number({ default: 100 }),
});
