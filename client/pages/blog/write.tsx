import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import BlogLayout from '@/layouts/Blog';
import { TuiEditorWithForwardedProps } from '@/components/Editor';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { Input, Select, Row, Col, Button } from 'antd';
import { css } from '@emotion/react';

// https://myeongjae.kim/blog/2020/04/05/tui-editor-with-nextjs
// ssr과 props관련 이슈 위 주소 참고

// SSR disable
const Editor = dynamic<TuiEditorWithForwardedProps>(() => import('@/components/Editor'), {
	ssr: false,
});
interface EditorPropsWithHandlers extends EditorProps {
	onChange?(value: string): void;
}
const EditorWithForwardedRef = React.forwardRef<EditorType | undefined, EditorPropsWithHandlers>(
	(props, ref) => <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />,
);

const Write = () => {
	const [title, setTitle] = useState('');
	const [contents, setContents] = useState<string | undefined>('');
	const editorRef = useRef<EditorType>();
	const router = useRouter();

	const handleEditor = useCallback(() => {
		const instance = editorRef.current?.getInstance();
		setContents(instance?.getHtml());
		console.log(instance?.getMarkdown());
	}, [editorRef]);

	const onClickHandler = useCallback(() => {
		console.log(title);
		console.log(contents);
	}, [title, contents]);

	const onCancelHandler = useCallback(() => {
		let flag: boolean = true;
		if (title || contents) {
			flag = confirm('작성중인 내용이 존재합니다. 정말 취소하시겠습니까?');
		}
		if (!flag) return;
		router.back();
	}, [title, contents]);

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
					<Input value={title} onChange={evt => setTitle(evt.target.value)} />
				</Col>
			</Row>
			<EditorWithForwardedRef
				initialValue=""
				previewStyle="vertical"
				height="600px"
				initialEditType="wysiwyg"
				useCommandShortcut={true}
				ref={editorRef}
				onChange={handleEditor}
			/>
			<Row justify="center" css={btnListStyle}>
				<Button onClick={onClickHandler} css={btnOkStyle}>
					확인
				</Button>
				<Button danger onClick={onCancelHandler}>
					취소
				</Button>
			</Row>
		</BlogLayout>
	);
};

const btnListStyle = css`
	margin: 24px 0;
`;
const btnOkStyle = css`
	color: blue;
	border: 1px solid blue;
	margin-right: 0.5rem;
`;

export default Write;
