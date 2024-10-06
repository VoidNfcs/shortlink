import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
	const apiKey = req.headers.get('x-api-key');

	const isLocal =
		req.nextUrl.hostname === 'localhost' ||
		req.nextUrl.hostname === '127.0.0.1';

	if (!isLocal && (!apiKey || apiKey !== process.env.API_KEY)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/api/v1/shortlink'],
};
