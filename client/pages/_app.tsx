import React from 'react';
import AppLayout from '@/layouts/App';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import wrapper from '@/store';

const App = ({ Component }: AppProps) => {
	return (
		<AppLayout>
			<Component />
		</AppLayout>
	);
};

export default wrapper.withRedux(App);
