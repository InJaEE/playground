import axios from 'axios';

export const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_PROD_BACKEND_URL
			: process.env.NEXT_PUBLIC_DEV_BACKEND_URL,
	withCredentials: true,
});
