import prisma from '@/lib/db';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000';

export async function POST(req: NextRequest) {
	try {
		const { url } = await req.json();

		if (!url) {
			return NextResponse.json(
				{ error: 'URL is required' },
				{ status: 400 }
			);
		}

		const existingLink = await prisma.shortenedLink.findUnique({
			where: {
				originalUrl: url,
			},
		});

		if (existingLink) {
			return NextResponse.json(
				{
					originalUrl: existingLink.originalUrl,
					shortenedId: existingLink.shortenedId,
					shortenedUrl: `${BASE_URL}/${existingLink.shortenedId}`,
				},
				{ status: 200 }
			);
		}

		const shortenedId = nanoid(10);

		const shortenedLink = await prisma.shortenedLink.create({
			data: {
				originalUrl: url,
				shortenedId: shortenedId,
			},
		});

		return NextResponse.json(
			{
				originalUrl: shortenedLink.originalUrl,
				shortenedId: shortenedLink.shortenedId,
				shortenedUrl: `${BASE_URL}/${shortenedId}`,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error creating shortened link:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		const datas = await prisma.shortenedLink.findMany();
		return NextResponse.json(
			{
				data: datas,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error fetching shortened links:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
