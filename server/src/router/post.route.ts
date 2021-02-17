import { Router } from 'express';
import prisma from '@/database';
const router = Router();

router.get('/', async (req, res) => {
	//const { category, title } = req.query;
	const { title, category } = req.query as any;
	const result = await prisma.post.findMany({
		include: {
			code_info: true,
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
	res.json({ result });
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	console.log('id:', id);
	const result = await prisma.post.findFirst({
		where: {
			id,
		},
	});
	res.json({ result });
});

router.post('/', async (req, res) => {
	// Typescript 32de5730-1735-4fc7-9305-6b310a0c19ea
	// Javascript d26a747c-cf6f-4495-ab3b-fdaa2ce09f2c
	// ComputerScience a580e3ad-6afb-4946-9882-77c87813fa0d
	const { title, contents, category_id } = req.body;
	const result = await prisma.post.create({
		data: {
			title,
			contents,
			category_id,
		},
	});
	res.json({ result });
});

export default router;
