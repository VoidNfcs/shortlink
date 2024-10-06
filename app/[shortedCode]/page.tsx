'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Loader, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RedirectPage: React.FC = () => {
	const { shortedCode } = useParams<{ shortedCode: string }>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchOriginalUrl = async () => {
			if (shortedCode) {
				try {
					const response = await fetch(
						`/api/v1/shortlink/${shortedCode}`
					);
					if (!response.ok) {
						setError('Shortened link not found');
						setTimeout(() => {
							router.push('/');
						}, 3000);
						return;
					}
					const data = await response.json();
					if (data.originalUrl) {
						router.push(data.originalUrl);
					} else {
						setError('Original URL not found');
					}
				} catch (error) {
					setError('Error fetching data');
					console.error('Error fetching data:', error);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchOriginalUrl();
	}, [shortedCode, router]);

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			{loading ? (
				<div className='flex flex-col items-center'>
					<Loader className='animate-spin h-16 w-16 text-blue-500 mb-4' />
					<p className='text-lg text-gray-700'>Redirecting...</p>
				</div>
			) : error ? (
				<div className='flex flex-col items-center text-red-500'>
					<XCircle className='h-16 w-16' />
					<p className='text-lg'>{error}</p>
				</div>
			) : null}
		</div>
	);
};

export default RedirectPage;
