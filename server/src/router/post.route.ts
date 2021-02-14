import { Router } from 'express';
import prisma from '@/database';
const router = Router();

router.get('/', async (req, res) => {
	const result = await prisma.post.findMany();
	res.json({ result });
});

router.post('/', async (req, res) => {
	const { title, contents } = req.body;
	const result = await prisma.post.create({
		data: {
			title,
			contents,
			category_id: '32de5730-1735-4fc7-9305-6b310a0c19ea',
		},
	});
	res.json({ result });
});

export default router;
