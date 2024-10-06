import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { shortedCode: string } }
) {
	const { shortedCode } = params;

	try {
		const link = await prisma.shortenedLink.findUnique({
			where: {
				shortenedId: shortedCode,
			},
		});

		if (!link) {
			return NextResponse.json(
				{ error: 'Shortened link not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json({ originalUrl: link.originalUrl });
	} catch (error) {
		console.error('Error fetching link:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
