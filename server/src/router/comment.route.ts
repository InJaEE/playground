import { Router } from 'express';
import prisma from '@/database';
import bcrypt from 'bcrypt';
import { parentPort } from 'worker_threads';

const router = Router();

type Query = {
	postId: string;
};

router.get('/', async (req, res) => {
	const { postId } = req.query as Query;
	const comments = await prisma.comment.findMany({
		where: {
			postId: Number(postId),
		},
		include: {
			avatar: true,
		},
		orderBy: {
			id: 'desc',
		},
	});

	const { parent, children } = comments.reduce(
		(acc, value) => {
			if (value.depth === 0) {
				acc.parent.push(value);
			} else {
				acc.children.push(value);
			}
			return acc;
		},
		{ parent: [], children: [] },
	);

	const result = parent.map(value => {
		value.children = [];

		children.forEach(childValue => {
			if (value.id === childValue.parentId) {
				value.children.push(childValue);
			}
		});

		return value;
	});

	res.json({ result, total: comments.length });
});

router.post('/', async (req, res) => {
	console.log(req.body);
	const { postId, author_id, author_pwd, contents, avatar, depth, parentId } = req.body;

	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('IP ::: ', ip);
	const hashedPwd = await bcrypt.hash(author_pwd, 10);

	const result = await prisma.comment.create({
		data: {
			post: {
				connect: {
					id: postId,
				},
			},
			author_id,
			author_pwd: hashedPwd,
			author_ip: '127.0.0.1',
			contents,
			depth: depth || 0,
			parentId: parentId || null,
			avatar: {
				create: {
					accessoriesType: avatar.accessoriesType,
					clotheColor: avatar.clotheColor,
					clotheType: avatar.clotheType,
					eyeType: avatar.eyeType,
					eyebrowType: avatar.eyebrowType,
					facialHairType: avatar.facialHairType,
					hairColor: avatar.hairColor,
					mouthType: avatar.mouthType,
					skinColor: avatar.skinColor,
					topType: avatar.topType,
				},
			},
		},
	});
	res.json({ result });
});

router.put('/', async (req, res) => {
	res.json();
});

router.delete('/', async (req, res) => {
	res.json();
});

export default router;
