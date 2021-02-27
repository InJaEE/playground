import { Router } from 'express';
import prisma from '@/database';
const router = Router();

router.get('/', async (req, res) => {
	const categories = await prisma.category.findMany();
	res.json({ result: categories });
});

router.post('/', async (req, res) => {
	const { name, type } = req.body;
	// type blog, ...
	const result = await prisma.category.create({
		data: {
			name,
			type,
		},
	});
	res.json({ result });
});

export default router;
