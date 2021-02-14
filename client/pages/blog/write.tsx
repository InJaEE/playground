import React from 'react';
import dynamic from 'next/dynamic';
import { EditorProps } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Input, Select, Row, Col, Button } from 'antd';
import BlogLayout from '@/layouts/Blog';

// SSR disable
const Editor = dynamic<EditorProps>(() => import('@toast-ui/react-editor').then(m => m.Editor), {
	ssr: false,
});

const Write = () => {
	return (
		<BlogLayout>
			<strong>글쓰기</strong>
			<Row>
				<Col span={4}>
					<Select defaultValue="선택" style={{ width: '100%' }}>
						<Select.Option value="선택">선택</Select.Option>
					</Select>
				</Col>
				<Col span={20}>
					<Input />
				</Col>
			</Row>
			<Editor
				initialValue=""
				previewStyle="vertical"
				height="600px"
				initialEditType="wysiwyg"
				useCommandShortcut={true}
			/>
			<Button>확인</Button>
		</BlogLayout>
	);
};

export default Write;
