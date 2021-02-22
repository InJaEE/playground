import React from 'react';
import AppLayout from '@/layouts/App';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import 'react-multi-carousel/lib/styles.css';
import wrapper from '@/store';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<AppLayout>
			<Component {...pageProps} />
		</AppLayout>
	);
};

export default wrapper.withRedux(App);
