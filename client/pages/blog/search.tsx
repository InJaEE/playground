import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BlogLayout from '@/layouts/Blog';

const Search = () => {
	const router = useRouter();
	const { query } = router;
	useEffect(() => {
		console.log(router);
		console.log(router.query);
	}, [query]);

	return <BlogLayout>{JSON.stringify(query)}</BlogLayout>;
};
export default Search;
