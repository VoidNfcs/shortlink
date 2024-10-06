'use client';
import React, { useEffect, useState } from 'react';

// Define the type for your shortened link
interface ShortenedLink {
	id: string;
	originalUrl: string;
	shortenedId: string;
}

const ListUrl: React.FC = () => {
	const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([]);
	const [error, setError] = useState<string | null>(null);

	const getData = async () => {
		try {
			const response = await fetch('/api/v1/shortlink', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Removed the x-api-key header
				},
			});
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await response.json();
			console.log('API response:', data); // Log the API response
			setShortenedLinks(data.data); // Ensure this matches your API response structure
		} catch (error) {
			console.error('Error fetching data:', error);
			setError('Error fetching data. Please try again later.');
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='max-w-2xl mx-auto p-4'>
			<h2 className='text-2xl font-bold mb-4'>List of Shortened Links</h2>
			{error && <p className='text-red-500'>{error}</p>}
			<ul className='bg-white shadow-md rounded-lg'>
				{shortenedLinks.length === 0 ? (
					<li className='p-4 text-gray-500'>No links available.</li>
				) : (
					shortenedLinks.map((link) => (
						<li
							key={link.shortenedId}
							className='border-b last:border-b-0'>
							<div className='flex justify-between items-center p-4 hover:bg-gray-100'>
								<div>
									<p className='text-gray-800 font-semibold'>
										Original URL:
									</p>
									<a
										href={link.originalUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='text-blue-600 hover:underline'>
										{link.originalUrl}
									</a>
								</div>
								<div>
									<p className='text-gray-800 font-semibold'>
										Shortened ID:
									</p>
									<span className='text-gray-600'>
										{link.shortenedId}
									</span>
								</div>
							</div>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default ListUrl;
