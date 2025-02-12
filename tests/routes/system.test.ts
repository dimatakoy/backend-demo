import { expect, test } from 'vitest';
import { createTestApp } from '../helpers.js';

test('returns ok when app ready', async () => {
	const app = createTestApp();
	await app.ready();

	const response = await app.inject({ url: '/system/ok' });

	expect(response.statusCode).toBe(200);
	expect(response.json()).toStrictEqual({ ok: true });
});
