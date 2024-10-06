import React from 'react';
import FormContainer from '@/components/FormContainer';

const Home = () => {
	return (
		<main className='flex min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 justify-center items-center px-4'>
			<div className='max-w-lg w-full md:max-w-xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg border border-gray-200'>
				<div className='text-center mb-6 md:mb-8'>
					{/* Header with Icon */}
					<h1 className='text-4xl md:text-6xl font-extrabold text-gray-800 text-center'>
						Link Shortener
					</h1>
					<p className='text-md md:text-xl font-medium text-gray-600 mt-2'>
						Shorten your links effortlessly and share them with the
						world.
					</p>
				</div>
				{/* Form Container */}
				<FormContainer />
				<div className='text-center mt-4'>
					<p className='text-xs text-gray-500'>
						No more long URLs. Share your links with ease!
					</p>
				</div>
			</div>
		</main>
	);
};

export default Home;
