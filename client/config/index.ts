let config = {
	BACKEND_URL: '',
	IMG_URL: '',
};

if (process.env.NODE_ENV === 'production') {
	config.BACKEND_URL = process.env.NEXT_PUBLIC_PROD_BACKEND_URL as string;
	config.IMG_URL = process.env.NEXT_PUBLIC_PROD_IMG_URL as string;
} else {
	config.BACKEND_URL = process.env.NEXT_PUBLIC_DEV_BACKEND_URL as string;
	config.IMG_URL = process.env.NEXT_PUBLIC_DEV_IMG_URL as string;
}

export default config;
