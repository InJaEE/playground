import React, { useMemo, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import { MainWrapper } from './style';
import 'antd/dist/antd.css';

type Props = {
	children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
	const router = useRouter();
	const isMain = useMemo(() => router.pathname === '/', [router]);
	return (
		<div>
			<Head>
				<title>INJAE'S PLAYGROUND</title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</Head>
			<Header isMain={isMain} />
			<MainWrapper isMain={isMain}>{children}</MainWrapper>
		</div>
	);
};

export default AppLayout;
