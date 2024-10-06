'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { Link2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const FormContainer: React.FC = () => {
	const [inputUrl, setInputUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [shortenedLinkId, setShortenedLinkId] = useState('');
	const [isCopied, setIsCopied] = useState(false);
	const [shortenedUrl, setShortenedUrl] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setErrorMessage('');

		try {
			const response = await fetch('/api/v1/shortlink', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
				},
				body: JSON.stringify({ url: inputUrl }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error || 'Failed to create shortened link'
				);
			}
			const data = await response.json();
			setShortenedUrl(data.shortenedUrl);
			setShortenedLinkId(data.shortenedId);
			setInputUrl('');
		} catch (error: unknown) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage('An unexpected error occurred');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleCopy = async () => {
		if (shortenedLinkId) {
			await navigator.clipboard.writeText(shortenedUrl);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		}
	};

	return (
		<form
			className='flex flex-col w-full space-y-4'
			onSubmit={handleSubmit}>
			<div className='flex flex-col'>
				<Label
					htmlFor='url'
					className='text-left'>
					Paste Your Link Here
				</Label>
				<Input
					type='url'
					id='url'
					value={inputUrl}
					onChange={(e) => setInputUrl(e.target.value)}
					placeholder='e.g., https://example.com'
					required
					className='border border-gray-300 rounded-md p-3 transition-colors focus:border-blue-500 focus:ring focus:ring-blue-200'
				/>
			</div>
			<Button
				type='submit'
				disabled={isLoading || !inputUrl}
				className={`w-full mt-2 flex items-center justify-center space-x-2 ${
					isLoading
						? 'opacity-50 cursor-not-allowed'
						: 'bg-blue-500 hover:bg-blue-600'
				}`}>
				{isLoading ? (
					<span className='animate-spin'>
						<Link2
							className='h-6 w-6 text-white'
							aria-hidden='true'
						/>
					</span>
				) : (
					<Link2
						className='h-6 w-6 text-white'
						aria-hidden='true'
					/>
				)}
				<span>{isLoading ? 'Creating...' : 'Shorten My Link'}</span>
			</Button>
			{errorMessage && <p className='text-red-500'>{errorMessage}</p>}
			{shortenedLinkId && (
				<div className='flex items-center justify-between'>
					<p className='text-green-500'>
						Shortened Link:{' '}
						<Link
							href={shortenedLinkId}
							target='_blank'
							rel='noopener noreferrer'>
							{shortenedUrl}
						</Link>
					</p>
					<Button
						onClick={handleCopy}
						className={`ml-2 ${
							isCopied
								? 'text-green-500'
								: 'bg-gray-300 hover:bg-gray-400'
						}`}>
						{isCopied ? (
							<CheckCircle className='h-4 w-4 animate-bounce' />
						) : (
							<CheckCircle className='h-4 w-4' />
						)}
						{isCopied ? 'Copied!' : 'Copy Link'}
					</Button>
				</div>
			)}
		</form>
	);
};

export default FormContainer;
