import React from 'react';
import MemoLayout from '@/layouts/Memo';
import { List } from 'antd';

const DevMemo = () => {
	return (
		<>
			<MemoLayout>
				<h1>Memo</h1>
				<List itemLayout="vertical" size="large" />
			</MemoLayout>
		</>
	);
};

export default DevMemo;
