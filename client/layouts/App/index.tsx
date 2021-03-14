import React, { useMemo, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { MainWrapper } from './style';
import 'antd/dist/antd.css';
import Footer from '@/components/Footer';

type Props = {
	children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
	const router = useRouter();
	const isMain = useMemo(() => router.pathname === '/', [router]);
	return (
		<div>
			<Head>
				<title>INJAE's PLAYGROUND</title>
			</Head>
			<Header isMain={isMain} />
			<MainWrapper isMain={isMain}>{children}</MainWrapper>
			<Footer />
		</div>
	);
};

export default AppLayout;
