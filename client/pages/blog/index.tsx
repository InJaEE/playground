import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import BlogLayout from '@/layouts/Blog';
import { Button, List, Skeleton } from 'antd';
import { loadPosts, testPost } from '@/store/actions/post';
import wrapper from '@/store/';

const Blog = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { posts, loadPostsLoading } = useSelector(state => state.post);

	useEffect(() => {
		console.log('ROuter:', router.query);
		// async function fetch() {
		// 	const { payload } = await dispatch(loadPosts());
		// 	console.log('payload.result:', payload.result);

		// 	console.log('selector:', selector);
		// }
		// fetch();
		dispatch(loadPosts());
	}, [dispatch]);
	// const dispatchTest = () => {
	// 	dispatch(testPost()).then(res => console.log('res', res));
	// };
	return (
		<>
			<BlogLayout>
				{/* <Button onClick={dispatchTest}>TEST</Button> */}
				<List
					itemLayout="vertical"
					size="large"
					pagination={{
						onChange: page => {
							console.log(page);
						},
						pageSize: 10,
						style: { textAlign: 'center' },
					}}
					dataSource={posts || listData}
					renderItem={(item: any) => {
						return loadPostsLoading ? (
							<Skeleton active />
						) : (
							<List.Item key={item.id}>
								<List.Item.Meta title={item.title} description={item.code_info.name} />
								{item.contents} {item.created_at}
							</List.Item>
						);
					}}
				/>
			</BlogLayout>
		</>
	);
};

// wrapper.getServerSideProps(async context => {
// 	context.store.dispatch(loadPosts());
// });

const listData: any = [];
for (let i = 0; i < 23; i++) {
	listData.push({
		href: 'https://ant.design',
		title: `ant design part ${i}`,
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description:
			'Ant Design, a design language for background applications, is refined by Ant UED Team.',
		content:
			'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
	});
}

export default Blog;
