import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Sports = () => {
	const router = useRouter();
	useEffect(() => {
		alert('준비중입니다.');
		router.push('/');
	}, []);
	return <div>Sports</div>;
};

export default Sports;
