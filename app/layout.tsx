import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'URL Shortener - Your Shortened Links',
	description: 'Effortlessly shorten your URLs and manage them efficiently.',
	keywords: 'URL Shortener, Short Links, Manage URLs, Link Management',
	authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
	openGraph: {
		title: 'URL Shortener - Your Shortened Links',
		description:
			'Effortlessly shorten your URLs and manage them efficiently.',
		url: 'https://link.voidnfc.xyz',
		siteName: 'Void NFC',
		images: [
			{
				url: 'https://link.voidnfc.xyz/preview-image.png', // Replace with your preview image URL
				width: 800,
				height: 600,
				alt: 'Preview Image Description',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'URL Shortener - Your Shortened Links',
		description:
			'Effortlessly shorten your URLs and manage them efficiently.',
		images: ['https://link.voidnfc.xyz/preview-image.png'], // Replace with your preview image URL
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
