import prisma from '@/database';
import fs from 'fs';
import appRoot from 'app-root-path';
import path from 'path';

export const deleteNoneExistsImage = async () => {
	// 1. Image 테이블에서 이미지를 찾은 후에
	// 2. Post table에 이미지가 존재하지 않는다면
	// 3.  Image 테이블에서 Raw를 삭제하고
	// 4. 서버의 이미지 파일을 삭제한다.

	const image = await prisma.image.findMany();
	console.log(image);
	for await (let item of image) {
		console.log('!!!!!!! item.path', item.path);
		const postQuery = await prisma.post.findMany({
			where: {
				contents: {
					contains: item.path,
				},
			},
		});
		console.log('@@@@@@@@@ postQuery', postQuery);
		if (postQuery.length > 0) {
			console.log('item.postId :::', item.postId);
			await prisma.image.deleteMany({
				where: {
					id: item.postId, // 'postId'
				},
			});
			const imgPath = path.join(appRoot.path, item.path);
			console.log('#######', imgPath);
			fs.unlink(imgPath, err => {
				if (err) {
				}
				console.log('File Delete Success! ::: ', imgPath);
			});
		}
	}
};
