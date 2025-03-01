import { expect, test } from 'vitest';
import { createTestApp } from '../testApp.js';

test('returns ok when app ready', async (ctx) => {
	const app = await createTestApp(ctx);

	const response = await app.inject({ url: '/system/ok' });

	expect(response.statusCode).toBe(200);
	expect(response.json()).toStrictEqual({ ok: true });
});
