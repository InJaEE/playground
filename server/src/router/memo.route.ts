import { Router } from 'express';
import prisma from '@/database';
const router = Router();

router.get('/', async (req, res) => {
	const memo = await prisma.memo.findMany();
	res.json({ memo });
});

router.post('/', async (req, res) => {
	const { contents, hashTag } = req.body;
	await prisma.memo.create({
		data: {
			contents,
			hashTag,
		},
	});
	res.json();
});

export default router;
