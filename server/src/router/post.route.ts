import { Router } from 'express';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import prisma from '@/database';
const router = Router();

type Query = {
	title: string;
	category: string;
};

router.get('/', async (req, res) => {
	//const { category, title } = req.query;
	const { title, category } = req.query as Query;
	const result = await prisma.post.findMany({
		include: {
			code_info: true,
			images: true,
		},
		orderBy: {
			created_at: 'desc',
		},
		where: {
			title: { contains: title },
			code_info: {
				name: category,
			},
		},
	});
	// prisma.image.findMany({
	// 	include: {

	// 	}
	// })

	res.json({ result });
});

router.get('/:postId', async (req, res) => {
	const { postId } = req.params;
	console.log('postId:', postId);
	const result = await prisma.post.findFirst({
		where: {
			id: Number(postId),
		},
		include: {
			images: true,
			// comments: {
			// 	include: {
			// 		avatar: {

			// 		}
			// 	}
			// }
		},
	});
	res.json({ result });
});

router.post('/', async (req, res) => {
	const { title, contents, category_id } = req.body;
	// contents에서 받은 이미지 base64를 걸러내어서 파일로 변환한 후에,
	// 파일은 서버내 폴더에 저장,
	// Images table에 파일 이름 저장.

	const imgArr = contents.match(/<img[^>]*>/g);
	if (imgArr) {
		// base64로된 이미지를 배열에 담는다.
		const base64Arr = imgArr.map(v => v.match(/src="(data:image\/[^;]+;base64[^"]+)"/i, '')[1]);

		const fileNameArr: string[] = [];
		base64Arr.forEach(img => {
			const ext = img.substring('data:image/'.length, img.indexOf(';base64'));
			const fileName = `images/${uuid()}.${ext}`;
			fileNameArr.push(fileName);
			// images폴더에 파일로 저장
			fs.writeFile(fileName, img.replace(/^data:image\/[^;]+;base64,/, ''), 'base64', err => {
				console.log(err);
			});
		});

		const removeImgHtml = fileNameArr.reduce((acc, file) => {
			return acc.replace(
				/<img src="(data:image\/[^;]+;base64[^"]+)[^>]*">/i,
				`<img src='http://localhost:3001/${file}' alt='image'/>`,
			);
		}, contents);

		// TODO: 트랜잭션 사용해야함!!!
		const postResult = await prisma.post.create({
			data: {
				title,
				contents: removeImgHtml,
				category_id,
			},
		});
		const imageData = fileNameArr.map(file => ({ path: file, postId: postResult.id }));

		const imageResult = await prisma.image.createMany({
			skipDuplicates: true,
			data: imageData,
		});
	} else {
		console.log('Image not found!');
		await prisma.post.create({
			data: {
				title,
				contents,
				category_id,
			},
		});
	}

	// await prisma.$transaction();
	// res.json({ result });
	res.send('GOOD!');
});

router.put('/', async (req, res) => {
	// 수정할때는 Images폴더의 해당 게시물의 이미지를
	// 전부 삭제한 후에 다시 생성
	res.json();
});

export default router;
