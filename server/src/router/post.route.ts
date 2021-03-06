import { Router } from 'express';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import prisma from '@/database';
const router = Router();
import { isAdmin } from '@/middleware/auth';

type Query = {
	title: string;
	category: string;
};

router.get('/', async (req, res) => {
	const { title, category } = req.query as Query;
	const result = await prisma.post.findMany({
		include: {
			category: true,
			images: true,
		},
		orderBy: {
			created_at: 'desc',
		},
		where: {
			title: { contains: title },
			category: {
				name: category,
			},
			use_yn: 'Y',
		},
	});

	res.returnSuccess({ result });
});

router.get('/:postId', async (req, res) => {
	const { postId } = req.params;
	const result = await prisma.post.findFirst({
		where: {
			id: Number(postId),
		},
		include: {
			images: true,
			category: true,
			like: {
				where: {
					postId: Number(postId),
				},
			},
		},
	});
	res.returnSuccess({ result });
});

router.post('/', isAdmin, async (req, res) => {
	const { title, contents, category_id } = req.body;

	// 이미지 태그가 존재하는지 확인
	const imgArr = contents.match(/<img[^>]*>/g);
	if (imgArr) {
		const [removeBase64Contents, fileNameArr] = base64ImgProcess(contents, imgArr);

		// TODO: 트랜잭션 사용해야함!!!
		const postResult = await prisma.post.create({
			data: {
				title,
				contents: removeBase64Contents,
				category_id,
			},
		});
		const imageData = fileNameArr.map(file => ({ path: file, postId: postResult.id }));

		const imageResult = await prisma.image.createMany({
			skipDuplicates: true,
			data: imageData,
		});
	} else {
		await prisma.post.create({
			data: {
				title,
				contents,
				category_id,
			},
		});
	}

	// await prisma.$transaction();
	res.returnSuccess({ result: 'Success' });
});

router.put('/:postId', isAdmin, async (req, res) => {
	const { postId } = req.params;
	const { title, contents, category_id } = req.body;

	// base64로 이루어진 이미지 태그가 존재하는지 확인
	const imgArr = contents.match(/<img src="(data:image\/[^;]+;base64[^"]+)[^>]*">/gi);
	if (imgArr) {
		const [removeBase64Contents, fileNameArr] = base64ImgProcess(contents, imgArr);

		const postUpdate = prisma.post.update({
			data: {
				title,
				contents: removeBase64Contents,
				category_id,
			},
			where: {
				id: Number(postId),
			},
		});
		const imageData = fileNameArr.map(file => ({ path: file, postId: Number(postId) }));

		const imageUpdate = prisma.image.createMany({
			skipDuplicates: true,
			data: imageData,
		});

		const result = await prisma.$transaction([postUpdate, imageUpdate]);
	} else {
		const result = await prisma.post.update({
			data: {
				title,
				contents,
				category_id,
			},
			where: {
				id: Number(postId),
			},
		});
	}
	res.returnSuccess({ result: 'Update Success' });
});

/**
 *
 * 게시글의 내용을 받아서 base64로 이루어진 이미지 파일이 존재하는지 확인한 후
 * 존재하면 이미지 파일을 서버에 저장하고 내용에서 base64를 서버의 이미지 파일로 바꾼 후 리턴한다.
 *
 * req.body로 받은 게시글의 내용
 * @param contents
 * contents에서 base64로 이루어진 img태그의 src를 서버에 저장된 이미지 경로로 변경한 contents와
 * 이미지 파일 이름을 담은 배열
 * @return [removeBase64Contents, fileNameArr]
 */
const base64ImgProcess = (contents, imgArr) => {
	// base64로된 이미지를 배열에 담는다.
	const base64Arr = imgArr.map(v => v.match(/src="(data:image\/[^;]+;base64[^"]+)"/i, '')[1]);

	const fileNameArr: string[] = [];
	base64Arr.forEach(img => {
		// 확장자명 구하기
		const ext = img.substring('data:image/'.length, img.indexOf(';base64'));
		const fileName = `images/${uuid()}.${ext}`;
		fileNameArr.push(fileName);
		// images폴더에 파일로 저장
		fs.writeFile(fileName, img.replace(/^data:image\/[^;]+;base64,/, ''), 'base64', err => {});
	});

	const removeBase64Contents = fileNameArr.reduce((acc, file) => {
		return acc.replace(
			/<img src="(data:image\/[^;]+;base64[^"]+)[^>]*">/i,
			`<img src='${process.env.BACKEND_URL}/${file}' alt='image'/>`,
		);
	}, contents);

	return [removeBase64Contents, fileNameArr];
};

router.delete('/:postId', async (req, res) => {
	const { postId } = req.params;
	const result = await prisma.post.update({
		data: {
			use_yn: 'N',
		},
		where: {
			id: Number(postId),
		},
	});
	res.returnSuccess({ result });
});

router.get('/like/:postId', async (req, res) => {
	const { postId } = req.params;
	const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;

	const result = await prisma.like.findUnique({
		where: {
			ip_postId: {
				ip,
				postId: Number(postId),
			},
		},
	});
	console.log(result);
	res.returnSuccess({ result });
});

router.post('/like/:postId', async (req, res) => {
	const { postId } = req.params;
	const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;
	console.log('IP@@@@@@@@@@@@@@@@@@@@', ip);
	console.log('IP@@@@@@@@@@@@@@@@@@@@', ip);
	console.log('IP@@@@@@@@@@@@@@@@@@@@', ip);

	try {
		await prisma.like.create({
			data: {
				ip,
				postId: Number(postId),
			},
		});
	} catch (err) {
		await prisma.like.delete({
			where: {
				ip_postId: {
					ip,
					postId: Number(postId),
				},
			},
		});
	}
	res.returnSuccess();
});

export default router;
